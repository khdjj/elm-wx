import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import Location from "@/components/location";
import { AtInput, AtTag } from "taro-ui";

import "./new.scss";

@observer
@inject("userStore")
export default class Index extends Component {
  config = {
    navigationBarTitleText: "新增地址",
  };

  @observable store = {
    name: "",
    phone: "",
    address: "",
    houseNumber: "",
    tag: "",
    sex: "女士",
    location: {},
  };

  componentDidMount() {
    const { userStore: uStore } = this.props;
    const { currentAddress = {} } = uStore;
    const { address = {} } = currentAddress;
    if (Object.keys(currentAddress).length > 0) {
      this.store = { ...currentAddress };
    }
    this.store.location = address;
    this.store.address = address.name;
  }

  handleSearchAddress = () => {
    Taro.navigateTo({ url: "/pages/address/search" });
  };

  handleSexTag = ({ name, active }) => {
    console.error(this.store.sex);
    this.store.sex = name;
  };

  handleOtherTag = ({ name, active }) => {
    this.store.tag = name;
  };


  handleInputChange = (key, value) => {
    this.store[key] = value;
  };

  handleReciveAddress = (address) => {
    if (address) {
      this.store.address = address.name;
      this.store.location = address;
    }
    console.error(address);
  };

  handleSaveAddress = async () => {
    const { id } = this.$router.params;
    const { name, phone, houseNumber, tag, sex, location } = this.store;
    const { userStore: uStore } = this.props;
    const data = {
      name,
      phone,
      houseNumber,
      tag,
      sex,
      address: location,
    };
    console.error(id);
    try {
      let doc;
      if (!id) {
        doc = await uStore.saveCurrentAddressAndSend({
          ...data,
        });
      } else {
        doc = await uStore.editUserAddress({
          ...data,
          id,
        });
      }

      if (doc.error) {
        Taro.showModal({
          title: "错误提示",
          content: doc.error,
        });
      } else {
        Taro.showToast({
          title: "保存成功",
          icon: "success",
          duration: 2000,
        });
        Taro.navigateBack();
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { name, phone, address, houseNumber, tag, sex } = this.store;
    console.error(sex, sex === "女士", sex == "女士");
    return (
      <View className="page">
        <AtInput
          title="联系人"
          type="text"
          placeholder="姓名"
          value={name}
          onChange={this.handleInputChange.bind(this, "name")}
        />
        <AtTag name="女士" onClick={this.handleSexTag} active={sex === "女士"}>
          女士
        </AtTag>
        <AtTag name="男士" onClick={this.handleSexTag} active={sex === "男士"}>
          男士
        </AtTag>
        <AtInput
          title="电话"
          type="text"
          placeholder="手机号码"
          value={phone}
          onChange={this.handleInputChange.bind(this, "phone")}
        />
        <AtInput
          title="地址"
          type="text"
          placeholder="地址"
          value={address}
          onChange={this.handleInputChange.bind(this, "address")}
        >
          <Location
            type="chooseLocation"
            color="red"
            onClick={this.handleReciveAddress}
          />
        </AtInput>
        <AtInput
          title="门牌号"
          type="text"
          placeholder="10号楼5层501室222"
          value={houseNumber}
          onChange={this.handleInputChange.bind(this, "houseNumber")}
        />
        <AtTag name="家" onClick={this.handleOtherTag} active={tag === "家"}>
          家
        </AtTag>
        <AtTag
          name="公司"
          onClick={this.handleOtherTag}
          active={tag === "公司"}
        >
          公司
        </AtTag>
        <AtTag
          name="学校"
          onClick={this.handleOtherTag}
          active={tag === "学校"}
        >
          学校
        </AtTag>
        <Button className="saveBtn" onClick={this.handleSaveAddress}>
          保存并使用
        </Button>
      </View>
    );
  }
}

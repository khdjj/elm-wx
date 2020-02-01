import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtInput, AtIcon, AtRadio, AtTag } from "taro-ui";
import { debounce, throttle } from "@/service/utils";

import "./new.scss";

@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "新增地址"
  };

  @observable store = {
    name: "",
    phone: "",
    address: "",
    houseNumber: "",
    tag: "",
    sex: ""
  };

  handleSearchAddress = () => {
    console.error("handleSearchAddress");
    Taro.navigateTo({ url: "/pages/address/search" });
  };

  handleSexTag = ({ name, active }) => {
    this.store.sex = name;
  };

  handleOtherTag = ({ name, active }) => {
    this.store.tag = name;
  };
  render() {
    const { name, phone, address, houseNumber, tag, sex } = this.store;
    return (
      <View className="page">
        <AtInput title="联系人" type="text" placeholder="姓名" value={name} />
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
        />
        <AtInput title="地址" type="text" placeholder="地址" value={address}>
          <AtIcon
            value="chevron-right"
            size="29"
            color="#2395ff"
            onClick={this.handleSearchAddress}
          ></AtIcon>
        </AtInput>
        <AtInput
          title="门牌号"
          type="text"
          placeholder="10号楼5层501室222"
          value={address}
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
      </View>
    );
  }
}

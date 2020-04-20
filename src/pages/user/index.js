import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observable, toJS, remove } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtList, AtListItem } from "taro-ui";
import config from "../../config/index";
import { removeLocalItem } from "../../service/utils";
import "./index.scss";

@inject("userStore", "globalStore")
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的",
  };

  @observable store = {
    userInfo: "",
    sso: "",
  };

  async componentDidMount() {
    const { userStore: uStore } = this.props;
    uStore.getUserInfo().then((res) => {
      this.store.userInfo = res.ret;
    });
    uStore.getSso().then((res) => {
      this.store.sso = res.data;
    });
  }

  selectAvatar = () => {
    const { globalStore } = this.props;
    const { userInfo } = this.store;
    const { weapp } = userInfo;
    Taro.chooseImage({ count: 1 }).then((res) => {
      console.error(res.tempFilePaths[0]);
      globalStore.uploadFile(res.tempFilePaths[0]).then((res) => {
        this.store.userInfo = {
          ...userInfo,
          weapp: {
            ...weapp,
            avatarUrl: `${config.upload}/${res.imgPath}`,
          },
        };
      });
    });
  };

  toOwnAddress = () => {
    Taro.navigateTo({ url: "/pages/address/selectOrderAddress" });
  };

  handleLogOut = () => {
    removeLocalItem("sso");
    removeLocalItem("userInfo");
    removeLocalItem("token");
    Taro.navigateTo({ url: "/pages/bindAccount/index" });
  };

  render() {
    const { userInfo = {}, sso } = this.store;
    const { weapp = {} } = userInfo;
    console.error(userInfo);
    return (
      <View className="page">
        <View className="profile">
          <View className="avatarListItem" onClick={this.selectAvatar}>
            <Text className="avatarTitle">头像</Text>
            <Image className="avatarImage" src={weapp.avatarUrl} />
          </View>
          <AtList>
            <AtListItem
              title="用户名"
              extraText={weapp.nickName}
              arrow="right"
            />
            <AtListItem title="手机号" extraText={sso.phone} arrow="right" />
            <AtListItem
              title="我的地址"
              arrow="right"
              onClick={this.toOwnAddress}
            />
          </AtList>
          <Button className="logoutButton" onClick={this.handleLogOut}>
            退出登录
          </Button>
        </View>
      </View>
    );
  }
}

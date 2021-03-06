import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtButton, AtInput, AtToast } from "taro-ui";
import Banner from "@/components/banner";
import { phoneisValid, setLocalItem } from "@/service/utils";
import "./index.scss";

@observer
@inject("userStore")
export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: "登录",
  };

  @observable store = {
    mobile: "",
    code: "",
    time: 60,
    timer: null,
    getCodeValid: true,
    codeText: "获取验证码",
    get isValid() {
      return this.mobile && this.code;
    },
  };

  onChange = (key, e) => {
    this.store[key] = e;
  };

  getCode = async (phone) => {
    const { userStore: store } = this.props;
    try {
      const doc = await store.getCode(phone);
      if (doc.ret == 0) {
        Taro.showToast({
          title: doc.msg,
          duration: 2000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleChangeStatus = () => {
    const store = this.store;
    const { mobile } = store;
    if (mobile == "" || !phoneisValid(mobile)) {
      Taro.showModal({
        content: "请输入正确的手机号",
        showCancel: false,
      });
      return;
    }
    this.getCode(mobile);
    store.getCodeValid = false;
    store.timer = setInterval(() => {
      store.codeText = "重新发送" + store.time;
      store.time--;
      if (store.time == 0) {
        clearInterval(store.timer);
        store.codeText = "获取验证码";
        store.getCodeValid = true;
        store.time = 60;
      }
    }, 1000);
  };

  onGotUserInfo = async (e) => {
    const data = e.detail;
    if (!data.userInfo) return;
    const { mobile, code } = this.store;
    const { userStore: store } = this.props;
    setLocalItem("userInfo", data.userInfo);
    Taro.showLoading();
    try {
      const doc = await store.bindAccount(mobile, code);
      const { error, data: res, token } = doc;
      setLocalItem("sso", res);
      setLocalItem("token", token);
      if (error) {
        let errText = "";
        switch (doc.error) {
          case 4002:
            errText = "对不起，验证码错误，请重试";
            break;
          case 4003:
            errText = "对不起，验证码已过期，请重试";
            break;
          default:
            errText = "对不起，出现错误，请重试";
        }
        Taro.showModal({
          title: "错误提示",
          content: errText,
        });
        return;
      } else {
        store.saveUserInfo(data.userInfo);
      }
      Taro.navigateTo({ url: "/pages/goods/index" });
    } catch (e) {
      console.error(e);
      return;
    } finally {
      Taro.hideLoading();
    }
  };

  render() {
    const { mobile, code, isValid, codeText, getCodeValid } = this.store;
    return (
      <View>
        <Banner />
        <View className="content">
          <View className="form">
            <AtInput
              value={mobile}
              placeholder="请输入电话号码"
              type="text"
              onChange={this.onChange.bind(this, "mobile")}
              clear
            />
            <AtInput
              value={code}
              placeholder="请输入验证码"
              type="text"
              onChange={this.onChange.bind(this, "code")}
              clear
            >
              <AtButton
                onClick={this.handleChangeStatus}
                type="secondary"
                disabled={!getCodeValid}
              >
                {codeText}
              </AtButton>
            </AtInput>
            <AtButton
              type="primary"
              openType="getUserInfo"
              lang="zh_CN"
              disabled={!isValid}
              onGetUserInfo={this.onGotUserInfo}
            >
              登录
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

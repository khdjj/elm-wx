import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import {
    AtImage
} from "taro-ui";
import { bannerTypes } from "@/consts/banner";
import pinzhitaocanImage from "@/images/pinzhitaocan.png";
import Main from "./components/main";

@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的"
  };



  render() {
    return (
      <View className="page">
        我的
      </View>
    );
  }
}

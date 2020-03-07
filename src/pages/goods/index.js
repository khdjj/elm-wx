import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import {
  AtButton,
  AtInput,
  AtIcon,
  AtSearchBar,
  AtGrid,
  AtTabBar
} from "taro-ui";
import Home from "./home";
import Order from '@/pages/order/index';
import Me from '@/pages/user/index'
import "./index.scss";

const tabList = [
  { title: "首页", iconType: "home" },
  { title: "我的订单", iconType: "bullet-list" },
  { title: "我的", iconType: "user" }
];

@observer
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    current: 0
  };

  handleClick = current => {
    console.error(current)
    const { title } = tabList[current];
    Taro.setNavigationBarTitle({
      title
    });
    this.setState({
      current
    });
  };

  render() {
    const { current } = this.state;
    return (
      <View className="page">
        {current === 0 && <Home />}
        {current === 1 && <Order />}
        {current === 2 && <Me />}
        <AtTabBar
          fixed
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    );
  }
}

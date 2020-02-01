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
  AtDrawer
} from "taro-ui";
import { bannerTypes } from "@/consts/banner";
import pinzhitaocanImage from "@/images/pinzhitaocan.png";
import Main from "./components/main";
import "./index.scss";

@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  @observable store = {
    location: "无定位信息",
    search: ""
  };

  componentDidMount() {}

  onSearch = () => {};

  handleSelectCity = () => {
    Taro.navigateTo({ url: "/pages/address/select" });
  };

  render() {
    const { location, search } = this.store;

    return (
      <View className="page">
        <View className="header">
          <View className="location-info">
            <AtIcon
              value="map-pin"
              size="24"
              color="#fff"
              className="location-icon"
            ></AtIcon>
            <Text className="location-title" onClick={this.handleSelectCity}>
              {location}
            </Text>
          </View>
          <AtSearchBar
            value={search}
            placeholder="输入商家、商品名称"
            onChange={this.onSearch.bind(this)}
          />
        </View>
        <View className="container">
          <AtGrid
            mode="square"
            hasBorder={false}
            data={bannerTypes}
            columnNum={5}
          />
          <Image src={pinzhitaocanImage} className="banner-image" />
          <View className="shoplist-title">推荐商家</View>
          <Main />
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import {
  AtIcon,
  AtSearchBar,
  AtGrid,
} from "taro-ui";
import { bannerTypes } from "@/consts/banner";
import pinzhitaocanImage from "@/images/pinzhitaocan.png";
import Main from "./components/main";

import './home.scss'

@inject("restaurantStore", "userStore")
@observer
export default class Home extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  @observable store = {
    location: "未知定位",
    search: "",
    address: {},
    shops: null
  };

  fetchRestList = async (
    offset = 0,
    limit = 8,
    extras = "activities",
    extra_filters = "home"
  ) => {
    const { restaurantStore: restStore, userStore } = this.props;
    const { address } = this.store;
    const doc = await restStore.getRestaurant({
      latitude: address.latitude,
      longitude: address.longitude,
      offset,
      limit,
      extras,
      extra_filters
    });
    this.store.shops = doc.ret;
    userStore.latitude = address.latitude;
    userStore.longitude = address.longitude;
  };

  async componentDidMount() {
    try {
      const doc = await Taro.getLocation();
      console.error(doc);
      if (doc) {
        this.store.address = doc;
        this.fetchRestList();
      }
    } catch (e) {
      const { errMsg } = e;
      if (errMsg && errMsg.includes("fail auth")) {
        return;
      }
    }
  }

  onSearch = () => {};

  handleSelectCity = () => {
    Taro.navigateTo({ url: "/pages/address/select" });
  };

  render() {
    const { location, search, shops } = this.store;
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
          {shops ? (
            <Main shops={shops} />
            // <View/>
          ) : (
            <View className="nodatatip-wrapper">
              <Image
                src="https://fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif"
                className="nodataimg"
              />
              <Text>输入地址后才能订餐哦！</Text>
              <Button className="enter-address-btn">手动选择地址</Button>
            </View>
          )}
        </View>
      </View>
    );
  }
}

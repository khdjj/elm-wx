import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtIcon, AtSearchBar, AtGrid } from "taro-ui";
import { bannerTypes } from "@/consts/banner";
import pinzhitaocanImage from "@/images/pinzhitaocan.png";
import Main from "./components/main";

import "./home.scss";

@inject("restaurantStore", "userStore")
@observer
export default class Home extends Component {
  config = {
    navigationBarTitleText: "首页",
  };

  @observable store = {
    search: "",
    address: {},
  };

  handleSearchChange = (value) => {
    this.store.search = value;
  };

  onSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) {
      this.props.onSearch(this.store.search);
      this.store.search = "";
    }
  };

  handleSelectCagetory = (item) => {
    console.error(item)
    Taro.navigateTo({ url: `/pages/goods/searchFood?category=${item.value}` });
  };

  handleSelectCity = () => {
    Taro.navigateTo({ url: "/pages/address/select" });
  };

  render() {
    const { search } = this.store;
    const { shops = [], location } = this.props;
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
            showActionButton
            onChange={this.handleSearchChange}
            placeholder="输入商家、商品名称"
            onActionClick={this.onSearch}
          />
        </View>
        <View className="container">
          <AtGrid
            mode="square"
            hasBorder={false}
            data={bannerTypes}
            columnNum={5}
            onClick={this.handleSelectCagetory}
          />
          <Image src={pinzhitaocanImage} className="banner-image" />
          <View className="shoplist-title">推荐商家</View>
          {shops.length > 0 ? (
            <Main shops={shops} />
          ) : (
            <View className="nodatatip-wrapper">
              <Image
                src="https://fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif"
                className="nodataimg"
              />
              <Text>输入地址后才能订餐哦！</Text>
              <Button
                className="enter-address-btn"
                onClick={this.handleSelectCity}
              >
                手动选择地址
              </Button>
            </View>
          )}
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtNavBar, AtSearchBar, AtIcon, AtButton } from "taro-ui";
import { debounce, throttle } from "@/service/utils";
import Location from "@/components/location";
import AddressList from "@/components/addressList";

import "./select.scss";

@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "选择收货地址"
  };

  @observable store = {
    search: ""
  };

  handleSelectCity = () => {
    Taro.navigateTo({ url: "/pages/address/city" });
  };

  handleNewAddress = () => {
    console.error("handleNewAddress");
    Taro.navigateTo({ url: "/pages/address/new" });
  };

  render() {
    const { search } = this.store;
    return (
      <View className="page">
        <View className="search_content">
          <Text className="province" onClick={this.handleSelectCity}>
            湘西民族自治区
          </Text>
          <AtIcon value="chevron-down" size="20" color="#333"></AtIcon>
          <AtSearchBar placeholder="请输入地址" value={search} />
        </View>
        <View>
          <AtButton type="primary" size="small" onClick={this.handleNewAddress}>
            新增地址
          </AtButton>
        </View>
        <View className="current_address">
          <View className="label">当前地址</View>
          <View className="location">
            <Text className="location_address">广州图书馆</Text>
            <View className="location_locate">
              <View className="location_icon">
                <Location />
              </View>
              <Text className="location_text">重新定位</Text>
            </View>
          </View>
          <View className="label">收货地址</View>
        </View>
        <View className="">
          <AddressList />
          <AddressList />
        </View>
      </View>
    );
  }
}

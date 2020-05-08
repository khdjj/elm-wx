import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtNavBar, AtSearchBar, AtIcon, AtButton } from "taro-ui";
import { debounce, throttle } from "@/service/utils";
// import Location from "@/components/location";
// import AddressList from "@/components/addressList";

import "./select.scss";

@inject("userStore")
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "选择定位地址",
  };

  @observable store = {
    search: "",
    searchList: [],
    city: "",
  };

  componentDidMount() {
    const { userStore } = this.props;
    userStore.getUserInfo().then((res) => {
      const { ret } = res;
      const { weapp = {} } = ret;
      this.store.city = weapp.city;
    });
  }

  handleSelectCity = () => {
    Taro.navigateTo({ url: "/pages/address/city" });
  };

  handleNewAddress = () => {
    this.store.searchList = [];
    this.store.search = "";
    Taro.navigateTo({ url: "/pages/address/new" });
  };

  handleSearchAddress = debounce((value) => {
    const { userStore } = this.props;
    const { city } = this.store;
    const { city: storeCity } = userStore;
    userStore.searchUserAddress(value, storeCity || city).then((res) => {
      this.store.searchList = res.tips || [];
    });
  }, 3000);

  selectAddress = (item) => {
    const { userStore } = this.props;
    userStore.selectAddress = {
      latitude: item.location.split(",")[1],
      longitude: item.location.split(",")[0],
      location: `${item.district}${item.address}`,
    };
    Taro.navigateTo({ url: "/pages/goods/index" });
  };

  render() {
    const { search, searchList, city } = this.store;
    const { userStore } = this.props;
    const { city: storeCity } = userStore;
    return (
      <View className="page">
        <View className="search_content">
          <Text className="province" onClick={this.handleSelectCity}>
            {storeCity || city}
          </Text>
          <AtIcon value="chevron-down" size="20" color="#333"></AtIcon>
          <AtSearchBar
            placeholder="请输入地址"
            value={search}
            onChange={this.handleSearchAddress.bind(this)}
          />
        </View>
        {/* {searchList.length === 0 && (
          <View>
            <AtButton
              type="primary"
              size="small"
              onClick={this.handleNewAddress}
            >
              新增地址
            </AtButton>
          </View>
        )} */}

        {searchList.length > 0 &&
          searchList.map((item) => (
            <View
              className="addressCell"
              onClick={() => this.selectAddress(item)}
            >
              <View className="title">{item.name}</View>
              <View className="address">
                {item.district}
                {item.address}
              </View>
            </View>
          ))}
        {/* <View className="current_address">
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
        </View> */}
      </View>
    );
  }
}

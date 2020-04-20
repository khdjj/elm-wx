import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtTabBar } from "taro-ui";
import { getDistance } from "@/service/utils";
import Home from "./home";
import Order from "./order";
import Me from "../user/index";

import "./index.scss";

const tabList = [
  { title: "首页", iconType: "home" },
  { title: "我的订单", iconType: "bullet-list" },
  { title: "我的", iconType: "user" },
];

@inject("restaurantStore", "userStore")
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
  };

  state = {
    current: 0,
  };

  @observable store = {
    address: {},
    shops: [],
    search: "",
    location: "",
    offset: 0,
    limit: 8,
    rank_id: "",
  };

  onChange = () => {};

  formatList = (data) => {
    const { address } = this.store;
    const list = [];
    data.map((item) => {
      const distance = getDistance(
        { longitude: address.longitude, latitude: address.latitude },
        { longitude: item.longitude, latitude: item.latitude }
      );
      list.push({
        ...item,
        distance,
      });
    });
    return list;
  };

  fetchRestList = async (offset = 0, limit = 8) => {
    Taro.showLoading();
    try {
      const { restaurantStore: restStore, userStore } = this.props;
      const { address, search } = this.store;
      const doc = await restStore.getRestaurant({
        offset,
        limit,
        search,
        latitude: 23.119449 || address.latitude,
        longitude: 113.308358 || address.longitude,
      });
      const restList = this.formatList(doc.ret);
      this.store.shops =
        offset === 0 ? restList : [...this.store.shops].concat(restList);
    } catch (e) {
      console.error(e);
    } finally {
      Taro.hideLoading();
    }
  };

  async componentDidMount() {
    const { userStore } = this.props;
    const { selectAddress } = userStore;
    if (Object.keys(selectAddress).length === 0) {
      try {
        const doc = await Taro.getLocation();
        if (doc) {
          const address = doc;
          userStore.getUserAddressByAmap(address).then((res) => {
            this.store.location = res.regeocode.formatted_address;
          });
          this.store.address = doc;
          userStore.selectAddress = {
            latitude: address.latitude,
            longitude: address.longitude,
            location: this.store.location,
          };
          this.fetchRestList();
        }
      } catch (e) {
        const { errMsg } = e;
        if (errMsg && errMsg.includes("fail auth")) {
          return;
        }
      }
    } else {
      this.store.address = selectAddress;
      this.store.location = selectAddress.location;
      this.fetchRestList();
    }
  }

  onReachBottom() {
    const { current } = this.state;
    const { offset, limit } = this.store;
    this.store.offset = limit + offset;
    if (current === 0) {
      this.fetchRestList(this.store.offset, limit);
    }
  }

  handleClick = (current) => {
    const { title } = tabList[current];
    Taro.setNavigationBarTitle({
      title,
    });
    this.setState({
      current,
    });
  };

  handleSearch = (value) => {
    const { offset, limit } = this.store;
    this.store.search = value;
    this.fetchRestList();
  };

  render() {
    const { current } = this.state;
    const { shops, location } = this.store;
    return (
      <View className="page">
        {current === 0 && (
          <Home
            shops={shops}
            location={location}
            onSearch={this.handleSearch}
          />
        )}
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

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

@inject("restaurantStore", "userStore", "orderStore")
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
    rstNoMore: false,
    orderNoMore: false,
    key: "",
    orderList: [],
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
    console.error("fetchRestList");
    try {
      const { restaurantStore: restStore } = this.props;
      const { address, search, rstNoMore, key } = this.store;
      if (rstNoMore) return;
      Taro.showLoading();
      const doc = await restStore.getRestaurant({
        offset,
        limit,
        search,
        key,
        latitude: address.latitude,
        longitude: address.longitude,
      });
      const restList = this.formatList(doc.ret);
      if (doc.ret.length === 0) this.store.rstNoMore = true;
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
    const { selectAddress = {} } = userStore;
    console.error("selectAddress", selectAddress);
    if (Object.keys(selectAddress).length === 0) {
      try {
        const doc = await Taro.getLocation();
        if (doc) {
          const address = doc;
          userStore.getUserAddressByAmap(address).then((res) => {
            this.store.location = res.regeocode.formatted_address;
          });
          this.store.address = doc;
          console.error("storeaddress", this.store.address);
          userStore.selectAddress = {
            latitude: address.latitude,
            longitude: address.longitude,
            location: this.store.location,
          };
          console.error("selectaddress", userStore.selectAddress);
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
    if (current === 1) {
      this.fetchOrderList(this.store.offset, limit);
    }
  }

  fetchOrderList = async (offset = 0, limit = 8) => {
    const { orderStore: oStore } = this.props;
    const { orderNoMore, orderList } = this.store;
    try {
      if (orderNoMore) return;
      Taro.showLoading();
      const doc = await oStore.getOrderList(offset, limit);
      if (doc.error) {
        Taro.showToast({
          title: "错误,请刷新重试",
          duration: 5000,
        });
        return;
      }
      if (doc.ret.length === 0) this.store.orderNoMore = true;
      const list = doc.ret;
      this.store.orderList = offset === 0 ? list : [...orderList].concat(list);
    } catch (e) {
    } finally {
      Taro.hideLoading();
    }
  };

  handleClick = (current) => {
    const { title } = tabList[current];
    Taro.setNavigationBarTitle({
      title,
    });
    if (current === 0) {
      this.fetchRestList();
    } else if (current === 1) {
      this.store.offset = 0;
      this.store.noMore = false;
      this.fetchOrderList();
    }
    this.setState({
      current,
    });
  };

  handleSearch = (value) => {
    this.store.search = value;
    this.store.rstNoMore = false;
    this.fetchRestList();
  };

  handleKeyChange = (key) => {
    console.err;
    this.store.offset = 0;
    this.store.key = key;
    this.store.rstNoMore = false;
    this.fetchRestList();
  };


  refreshGetOrderList = ()=>{
    this.store.orderNoMore = false;
    this.fetchOrderList();
  }

  render() {
    const { current } = this.state;
    const {
      shops,
      location,
      orderList = [],
      orderNoMore = false,
      rstNoMore,
    } = this.store;
    console.error(orderNoMore, rstNoMore);
    return (
      <View className="page">
        {current === 0 && (
          <Home
            shops={shops}
            noMore={rstNoMore}
            location={location}
            onKeyChange={this.handleKeyChange}
            onSearch={this.handleSearch}
          />
        )}
        {current === 1 && (
          <Order
            orderList={orderList}
            noMore={orderNoMore}
            getOrderList={this.refreshGetOrderList}
          />
        )}
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

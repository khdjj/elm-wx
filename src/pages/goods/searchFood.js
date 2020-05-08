import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { AtIcon, AtDrawer } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { sortTypes, sortItems } from "@/consts/sort";
import { getDistance } from "@/service/utils";
import ShopItem from "./commonPage/shopItem";
import "./components/main.scss";

@inject("userStore", "restaurantStore")
@observer
export default class SearchFood extends Component {
  @observable store = {
    show: false,
    sort: "综合排序",
    offset: 0,
    limit: 8,
    shops: [],
  };
  handleSort = (e) => {
    let { show } = this.store;
    this.store.show = !show;
  };

  componentDidMount() {
    const { category } = this.$router.params;
    const { offset, limit } = this.store;
    Taro.setNavigationBarTitle({
      title: category || "",
    });
    this.store.search = category;
    this.fetchRestList(offset, limit);
  }

  formatList = (data) => {
    const { userStore } = this.props;
    const { selectAddress: address } = userStore;
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
      const { latitude, longitude } = userStore.selectAddress;
      const { key, search } = this.store;
      const doc = await restStore.getRestaurant({
        offset,
        limit,
        search,
        latitude,
        key,
        longitude,
      });
      console.error(doc)
      const restList = this.formatList(doc.ret);
      this.store.shops =
        offset === 0 ? restList : [...this.store.shops].concat(restList);
      console.error(this.store.shops);
    } catch (e) {
      console.error(e);
    } finally {
      Taro.hideLoading();
    }
  };

  handleSort = (key, value) => {
    this.store.offset = 0;
    this.store.key = value;
    this.store.sort = key;
    this.fetchRestList();
  };

  handleDrawerClick = (e) => {};

  render() {
    const { show, sort, shops } = this.store;
    return (
      <View className="page">
        <View className="home-filter">
          <View className="filter-item">
            <Text
              className="item-title"
              style={sort === "rating" ? { color: "blue" } : ""}
              onClick={() => this.handleSort("rating", { rating: -1 })}
            >
              好评优先
            </Text>
          </View>
          <View className="filter-item">
            <Text
              onClick={() =>
                this.handleSort("recent_order_num", { recent_order_num: -1 })
              }
              style={sort === "recent_order_num" ? { color: "blue" } : ""}
            >
              销量最高
            </Text>
          </View>
          <View className="filter-item">
            <Text
              onClick={() =>
                this.handleSort("order_lead_time", { order_lead_time: 1 })
              }
              style={sort === "order_lead_time" ? { color: "blue" } : ""}
            >
              配送最快
            </Text>
          </View>
          <View className="filter-item">
            <Text
              onClick={() =>
                this.handleSort("float_minimum_order_amount", {
                  float_minimum_order_amount: 1,
                })
              }
              style={
                sort === "float_minimum_order_amount" ? { color: "blue" } : ""
              }
            >
              起送价最低
            </Text>
          </View>
        </View>
        {shops.map((shopItem) => (
          <ShopItem taroKey={shopItem._id} items={shopItem} />
        ))}
      </View>
    );
  }
}

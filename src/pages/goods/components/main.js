import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { AtIcon, AtDrawer } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { sortTypes, sortItems } from "@/consts/sort";
import ShopItem from "../commonPage/shopItem";
import "./main.scss";

@observer
export default class Main extends Component {
  @observable store = {
    sort: "综合排序",
  };
  handleSort = (key, keyValue) => {
    const { onKeyChange } = this.props;
    this.store.sort = key;
    if (onKeyChange) {
      onKeyChange(keyValue);
    }
  };

  handleDrawerClick = (e) => {};

  render() {
    const { sort } = this.store;
    const { shops = [] } = this.props;
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

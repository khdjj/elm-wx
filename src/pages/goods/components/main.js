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
    show: false,
    sort: "综合排序"
  };
  handleSort = e => {
    let { show } = this.store;
    this.store.show = !show;
  };
  
  handleDrawerClick = e => {
  };

  render() {
    const { show, sort } = this.store;
    const { shops = [] } = this.props;
    return (
      <View className="page">
        <View className="home-filter">
          <View className="filter-item">
            <Text className="item-title" onClick={this.handleSort}>
              {sort}
            </Text>
            <AtIcon value="chevron-down" size="15" color="#333"></AtIcon>
          </View>
          <View className="filter-item">
            <Text>距离最近</Text>
          </View>
          <View className="filter-item">
            <Text>品质联盟</Text>
          </View>
          <View className="filter-item">
            <Text className="item-title">筛选</Text>
            <AtIcon value="filter" size="15" color="#333"></AtIcon>
          </View>
        </View>
        <AtDrawer
          show={show}
          right
          mask
          items={sortTypes}
          onItemClick={this.handleDrawerClick}
        />
        {shops.map(shopItem => (
          <ShopItem taroKey={shopItem._id} items={shopItem} />
        ))}
      </View>
    );
  }
}

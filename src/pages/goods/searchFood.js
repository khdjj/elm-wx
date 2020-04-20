import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { AtIcon, AtDrawer } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { sortTypes, sortItems } from "@/consts/sort";
import { getDistance } from "@/service/utils";
import ShopItem from "./commonPage/shopItem";
import "./components/main.scss";

@inject("userStore",'restaurantStore')
@observer
export default class SearchFood extends Component {  
  @observable store = {
    show: false,
    sort: "综合排序",
    offset: 0,
    limit: 8,
    shops:[],
  };
  handleSort = (e) => {
    let { show } = this.store;
    this.store.show = !show;
  };

  componentDidMount() {
    const { category } = this.$router.params;
    const {offset,limit} = this.store
    Taro.setNavigationBarTitle({
      title: category || ""
    });
    this.fetchRestList(offset,limit,category);
  }


  
  formatList = (data) => {
    const {  userStore } = this.props;
    const {selectAddress:address} = userStore;
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

  fetchRestList = async (offset = 0, limit = 8,search) => {
    Taro.showLoading();
    try {
      const { restaurantStore: restStore, userStore } = this.props;
      const { latitude, longitude } = userStore.selectAddress;
      const doc = await restStore.getRestaurant({
        offset,
        limit,
        search,
        latitude,
        longitude,
      });
      const restList = this.formatList(doc.ret);
      this.store.shops =
        offset === 0 ? restList : [...this.store.shops].concat(restList);
        console.error(this.store.shops)
    } catch (e) {
      console.error(e);
    } finally {
      Taro.hideLoading();
    }
  };

  handleDrawerClick = (e) => {};

  render() {
    const { show, sort,shops } = this.store;
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
        {shops.map((shopItem) => (
          <ShopItem taroKey={shopItem._id} items={shopItem} />
        ))}
      </View>
    );
  }
}

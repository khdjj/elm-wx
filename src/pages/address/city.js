import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtIndexes, AtSearchBar } from "taro-ui";
import Cities from "@/consts/cities";
import { debounce, throttle } from "@/service/utils";
import "./city.scss";

const city = [];

Object.keys(Cities).forEach(item => {
  const d = {
    title: item,
    key: item,
    items: Cities[item]
  };
  city.push(d);
});

@inject("userStore")
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "城市选择"
  };

  @observable store = {
    search: "",
    data: []
  };

  handleSelectCity = item => {
    const {userStore} = this.props
    userStore.city = item.name
    Taro.navigateBack();
  };

  handleSearch = debounce(value => {
    if (!value) return this.store.data = [];
    const d = [];
    city.forEach(data => {
      const { items } = data;
      items.forEach(item => {
        const { name, pinyin } = item;
        if (name.indexOf(value) != -1 || pinyin.indexOf(value) != -1) {
          d.push(item);
        }
      });
    });
    this.store.data = d;
  }, 3000);

  render() {
    const { search, data } = this.store;
    return (
      <View>
        <View>
          <AtSearchBar
            value={search}
            onChange={this.handleSearch}
            placeholder="输入城市名或者拼音"
          />
        </View>
        {data.length > 0 ? (
          <View className="search_content">
            {data.map(item => (
              <View className="search_item" onClick={()=>this.handleSelectCity(item)}>{item.name}</View>
            ))}
          </View>
        ) : (
          <AtIndexes
            list={city}
            animation={true}
            onClick={this.handleSelectCity}
          ></AtIndexes>
        )}
      </View>
    );
  }
}

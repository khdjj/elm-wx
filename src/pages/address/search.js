import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtSearchBar } from "taro-ui";
import { debounce, throttle } from "@/service/utils";

import "./search.scss";

@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "搜索地址"
  };

  @observable store = {
    search: ""
  };

  onSearchChange = () => {};

  render() {
    const { search } = this.store;
    return (
      <View className="page">
        <View>
          <AtSearchBar value={search} onChange={this.onSearchChange} />
          <View className="list_content">
            <View className="seachrow">
              <View className="seachrow_title">广州图书馆</View>
              <View className="seachrow_location">广州图书馆</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import MenuItem from "./menuItem";

import "./detailShop.scss";

@observer
export default class Index extends Component {
  render() {
    return (
      // <View className="menuview_main">
      //   <View className="menucategory">
      //     <View className="menucategory_categoryWrapper">
      //       <Text className="menucategory_categoryItem">必选品(必选品)</Text>
      //       <Text className="menucategory_categoryItem">热销</Text>
      //       <Text className="menucategory_categoryItem">优惠</Text>
      //     </View>
      //   </View>
      // </View>

      <View className="menuview-menuList">
        <View className="menu">
          <View className="heading">
            <View className="category_title">
              <View className="category_name">热销</View>
              <View className="category_desc">大家喜欢吃，才叫真好吃。</View>
            </View>
          </View>
          {/* 具体商品   */}
          <MenuItem />
        </View>
      </View>
    );
  }
}

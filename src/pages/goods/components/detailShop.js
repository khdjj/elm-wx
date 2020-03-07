import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import MenuItem from "./menuItem";

import "./detailShop.scss";

@observer
export default class Index extends Component {
  render() {
    const { menus } = this.props;
    const { foods = [] } = menus;
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
              <View className="category_name">{menus.name}</View>
              <View className="category_desc">{menus.description}</View>
            </View>
          </View>
          {/* 具体商品   */}
          {foods.map(food => (
            <MenuItem food={food} />
          ))}
        </View>
      </View>
    );
  }
}

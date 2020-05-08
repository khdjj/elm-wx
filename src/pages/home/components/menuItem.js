import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import FoodItem from "./foodItem";

import "./menuItem.scss";

@observer
export default class MenuItem extends Component {
  render() {
    console.error("menItem");
    const { menus = {} } = this.props;
    const { foods = [] } = menus;
    return (
      <View>
        {foods.length > 0 && (
          <View className="menuview-menuList">
            <View className="menu">
              <View className="heading">
                <View className="category_title">
                  <View className="category_name">{menus.name}</View>
                  <View className="category_desc">{menus.description}</View>
                </View>
              </View>
              {/* 具体商品   */}
              {foods.map((food, index) => (
                <FoodItem key={index} taroKey={food.index} food={food} />
              ))}
            </View>
          </View>
        )}
      </View>
    );
  }
}

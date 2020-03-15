import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import MenuItem from "./menuItem";

@observer
export default class ShoppingCart extends Component {
  render() {
    const { menu = [] } = this.props;
    return (
      <View>
        {/* {menu.map(items => (
          <MenuItem menus={items} />
        ))} */}
        购买车
      </View>
    );
  }
}

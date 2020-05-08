import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtFloatLayout, AtIcon } from "taro-ui";
import CartFoodItem from "./cartFoodItem";
import MenuItem from "./menuItem";

import "./menuDetail.scss";

@observer
export default class MenuDetail extends Component {
  @observable store = {
    isOpened: false,
  };
  handleClose = () => {
    const { isOpened } = this.store;
    this.store.isOpened = !isOpened;
  };

  render() {
    const { isOpened } = this.store;
    const { menu = [] } = this.props;
    return (
      <View>
        <View>
          {menu.map((items, index) => (
            <MenuItem taroKey={index} key={index} menus={items} />
          ))}
        </View>
        {/* <View className="footer">
          <View className="shopping_icon">
            <AtIcon value="shopping-cart" size="40" color="#3190e8" />
          </View>
          <Text
            onClick={this.handleClose.bind(this)}
            className="bottomNav_carttotal"
          >
            ￥3.5
          </Text>
          <View className="submit_btn">还差¥16.5起送</View>
           <Button className="settlement_btn">去结算</Button>
        </View>
        <AtFloatLayout
          isOpened={isOpened}
          title="已选商品"
          onClose={this.handleClose.bind(this)}
        ></AtFloatLayout> */}
      </View>
    );
  }
}

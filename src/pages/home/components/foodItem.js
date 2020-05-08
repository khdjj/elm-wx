import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { getImageUrl } from "@/service/utils";
import FoodAttr from "./foodAttr";
import { AtIcon } from "taro-ui";

import "./foodItem.scss";

@observer
@inject("shoppingCartStore", "restaurantStore")
export default class FoodItem extends Component {
  @observable store = {
    openFoodAttr: false,
  };

  handleOpenFoodAttr = () => {
    const { openFoodAttr } = this.store;
    this.store.openFoodAttr = !openFoodAttr;
  };

  handleAddFoodToCart = (food) => {
    const { shoppingCartStore: sStore, restaurantStore: rStore } = this.props;
    const { attrs = [] } = food;
    if (attrs.length === 0) {
      sStore.saveShopingCart({
        food,
        minimunAmount: rStore.float_minimum_order_amount,
      });
    } else {
      this.handleOpenFoodAttr();
    }
  };

  handleAttrToCart = () => {};

  render() {
    const { food = {} } = this.props;
    const { openFoodAttr } = this.store;
    return (
      <View>
        <View className="menuitem">
          <View className="fooddetails">
            <View className="fooddetails_logo">
              <Image src={getImageUrl(food.image_path)} />
            </View>
            <View className="fooddetails_info">
              <View className="fooddetails_name">
                <Text>{food.name}</Text>
              </View>
              <View className="fooddetails_desc">{food.materials}</View>
              <View className="fooddetails_sales">
                <Text>月售{food.month_sales}份</Text>
              </View>
              <View className="salesInfo_price">
                <Text>￥{food.lowest_price}</Text>
                <View className="salesInfo_icon">
                  <AtIcon
                    value="add-circle"
                    size="30"
                    color="#2396ff"
                    onClick={() => this.handleAddFoodToCart(food)}
                  ></AtIcon>
                </View>
              </View>
            </View>
          </View>
        </View>
        {openFoodAttr && (
          <FoodAttr
            food={food}
            onClose={this.handleOpenFoodAttr}
            onSubmit={this.handleAttrToCart}
          />
        )}
      </View>
    );
  }
}

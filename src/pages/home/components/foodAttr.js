import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { getImageUrl, formatDistance } from "@/service/utils";

import "./foodAttr.scss";

@observer
@inject("shoppingCartStore", "restaurantStore")
export default class FoodAttr extends Component {
  state = {
    foodAttr: {},
  };

  handleClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  addAttr = (attr, text) => {
    const { foodAttr } = this.state;
    foodAttr[attr] = text;
    this.setState({
      foodAttr,
    });
  };

  addAttrToFood = () => {
    const { foodAttr } = this.state;
    const {
      food = {},
      shoppingCartStore: sStore,
      restaurantStore: rStore,
    } = this.props;
    food.select = foodAttr;
    sStore.saveShopingCart({
      food,
      minimunAmount: rStore.float_minimum_order_amount,
    });
    this.handleClose();
  };

  render() {
    const { food = {} } = this.props;
    const { foodAttr = {} } = this.state;
    const { attrs = [] } = food;
    return (
      <View className="specpanel_root">
        <View className="specpanel_main">
          <View className="specpanel_header">
            <View className="image">
              <Image src={getImageUrl(food.image_path, food)} />
            </View>
            <View className="specpanel_info">
              <Text className="specpanel_name">{food.name}</Text>
              <Text className="specpanel_price">￥{food.lowest_price}</Text>
            </View>
          </View>
          <View className="specpanel_body">
            {attrs.map((attr) => (
              <View>
                <Text className="specpanel_colTitle">{attr.name}</Text>
                <View className="specpanel_colBody">
                  {attr.values.map((text) => (
                    <Text
                      className={
                        foodAttr[attr.name] === text
                          ? "panel_activeItem"
                          : "panel_item"
                      }
                      onClick={() => this.addAttr(attr.name, text)}
                    >
                      {text}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View className="specpanel_doneBtn" onClick={this.addAttrToFood}>
            选好了
          </View>
          <View className="closeBtn" onClick={this.handleClose}>
            X
          </View>
        </View>
      </View>
    );
  }
}

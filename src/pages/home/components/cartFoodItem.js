import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtIcon } from "taro-ui";

import "./cartFoodItem.scss";

@inject("shoppingCartStore")
@observer
export default class cartFoodItem extends Component {

  handleOperate = type => {
    const { food = {}, shoppingCartStore: sStore } = this.props;
    sStore.addOrDeleteFoodItem({ food, type });
  };

  render() {
    const { food = {} } = this.props;
    const { select = {} } = food;
    return (
      <View className="entityList_entityrow">
        <View className="entityList_entityname">
          <Text className="entityList_name">{food.name}</Text>
          <Text className="entityList_entityspecs">
            {Object.values(select).join("/")}
          </Text>
        </View>
        <View className="entityList_entitytotal">
          <Text className="entityList-entitytotalDiscount">
            ¥{food.fprice}
          </Text>
        </View>
        <View className="entityList_entitycartbutton">
          <AtIcon
            value="add-circle"
            size="32"
            color="#3190e8"
            onClick={()=>this.handleOperate('add')}
          />
          <Text style={{ margin: "10px" }}>{food.num}</Text>
          <AtIcon
            value="subtract-circle"
            size="32"
            color="#3190e8"
            onClick={()=>this.handleOperate('delete')}
          />
        </View>
      </View>
    );
  }
}

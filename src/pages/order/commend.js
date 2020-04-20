import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Text,
  Image,
  Button,
  Picker,
  Textarea,
} from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtRate, AtList, AtListItem } from "taro-ui";
import { getImageUrl } from "@/service/utils";

import "./commend.scss";

@inject("orderStore")
@observer
export default class Detail extends Component {
  config = {
    navigationBarTitleText: "评价订单",
  };

  @observable store = {
    order: {},
    rate: 0,
    rateText:'',
  };

  componentDidMount() {
    const { orderStore: oStore } = this.props;
    const { order = {} } = oStore;
    const { commendOrder } = order;
    console.error(commendOrder);
    this.store.order = commendOrder;
  }

  handleRateTextChange = (e)=>{
      this.store.rateText = e.detail.value
  }

  handleRageChange = (value) => {
    this.store.rate = value;
  };

  render() {
    const { rate, order } = this.store;
    const { food = [], restaurant = {} } = order;
    return (
      <View className="page">
        <AtList>
          <AtListItem title="店铺名称" extraText={restaurant.name} />
          <View className="cart_group">
            {food.length > 0 &&
              food.map((f) => (
                <View className="cart_group2">
                  <Image
                    className="cart_image"
                    src={getImageUrl(f.image_path)}
                  />
                  <Text className="cart_rname">{f.name}</Text>
                  <Text className="cart_num">× {f.num}</Text>
                  <Text className="cart_price">¥{f.fprice}</Text>
                </View>
              ))}
          </View>
        </AtList>
        <View className="title">您的评级是什么呢</View>
        <AtRate value={rate} onChange={this.handleRageChange} />
        <View className="title">请输入对此订单的评价</View>
        <Textarea
          autoFocus
          placeholder="请输入评价"
          onInput={(e) => this.handleRateTextChange(e)}
        ></Textarea>
      </View>
    );
  }
}

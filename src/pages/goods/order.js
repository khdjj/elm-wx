import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { getImageUrl } from "@/service/utils";
import { AtButton } from "taro-ui";
import "./order.scss";

@inject("orderStore")
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的订单"
  };

  @observable store = {
    orderList: []
  };

  async componentDidMount() {
    const { orderStore: oStore } = this.props;
    try {
      Taro.showLoading();
      const doc = await oStore.getOrderList();
      if (doc.error) {
        Taro.showToast({
          title: "错误,请刷新重试",
          duration: 5000
        });
        return;
      }
      console.error(doc);
      this.store.orderList = doc.ret;
    } catch (e) {
    } finally {
      Taro.hideLoading();
    }
  }

  render() {
    const { orderList = [] } = this.store;
    console.error(toJS(orderList));
    return (
      <View className="page">
        <View className="ordercard">
          {orderList.length > 0 &&
            orderList.map(order => (
              <View className="ordercard-body">
                <View className="ordercard-avatar">
                  <Image
                    src={`https://cube.elemecdn.com/${getImageUrl(
                      order.restaurant.image_path
                    )}?x-oss-process=image/format,webp/resize,w_686`}
                  />
                </View>
                <View className="ordercard-content">
                  <View className="ordercard-head">
                    <View className="title">
                      <Text className="name">{order.restaurant.name}</Text>
                      <Text className="status">订单已送达</Text>
                    </View>
                    <Text className="datetime">{order.creatAt}</Text>
                  </View>
                  <View className="ordercard-detail">
                    <Text className="detail">
                      {order.food[0].name}等{order.food.length}件商品
                    </Text>
                    <Text className="price">¥{order.money}</Text>
                  </View>
                  <View className="ordercard-bottom">
                    <Button className="cardbutton">再来一单</Button>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </View>
    );
  }
}

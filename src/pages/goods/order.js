import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { getImageUrl, formatDate } from "@/service/utils";
import NoMore from "@/components/noMore";
import "./order.scss";

@inject("orderStore")
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的订单",
  };

  @observable store = {
    orderList: [],
  };

  handleChangeOrderStatus = (id, status) => {
    const { orderStore: oStore, getOrderList } = this.props;
    oStore.changeOrderStatus(id, status).then((res) => {
      if (getOrderList) {
        getOrderList();
      }
    });
  };

  handleToDetail = (id) => {
    Taro.navigateTo({ url: `/pages/order/detail?id=${id}` });
  };

  handleToRestaurant = (rst) => {
    const { name } = rst;
    Taro.navigateTo({ url: `/pages/home/detail?name=${name}` });
  };

  handleCommendOrder = (order) => {
    const { _id } = order;
    const { orderStore: oStore } = this.props;
    oStore.saveOrder({ commendOrder: order });
    Taro.navigateTo({ url: `/pages/order/commend` });
  };

  render() {
    const { orderList = [], noMore } = this.props;
    return (
      <View className="page">
        <View className="ordercard">
          {orderList.length > 0 &&
            orderList.map((order) => (
              <View className="ordercard-body">
                <View className="ordercard-avatar">
                  <Image
                    src={getImageUrl(
                      order.restaurant.image_path,
                      order.restaurant
                    )}
                    onClick={() => this.handleToRestaurant(order.restaurant)}
                  />
                </View>
                <View className="ordercard-content">
                  <View className="ordercard-head">
                    <View className="title">
                      <Text className="name">{order.restaurant.name}</Text>
                      <Text
                        className="status"
                        onClick={() => this.handleToDetail(order._id)}
                      >
                        订单已送达
                      </Text>
                    </View>
                    <Text className="datetime">
                      {formatDate(order.creatAt)}
                    </Text>
                  </View>
                  <View className="ordercard-detail">
                    <Text className="detail">
                      {order.food[0].name}等{order.food.length}件商品
                    </Text>
                    <Text className="price">¥{order.money}</Text>
                  </View>
                  <View className="ordercard-bottom">
                    {order.status === 0 && (
                      <View className="order-btnConent">
                        <Button
                          className="cardbutton"
                          onClick={() =>
                            this.handleChangeOrderStatus(order._id, -1)
                          }
                        >
                          取消订单
                        </Button>
                        <Button
                          className="cardbutton"
                          onClick={() =>
                            this.handleChangeOrderStatus(order._id, 1)
                          }
                        >
                          完成订单
                        </Button>
                      </View>
                    )}
                    {order.status === -1 && (
                      <Button className="cardbutton">订单已取消</Button>
                    )}
                    {order.status === 1 && (
                      <View className="order-btnConent">
                        <Button
                          className="cardbutton"
                          onClick={() => this.handleCommendOrder(order)}
                        >
                          评价此单
                        </Button>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          {noMore && <NoMore />}
        </View>
      </View>
    );
  }
}

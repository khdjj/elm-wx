import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button, Picker } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { getImageUrl, formatDate } from "@/service/utils";
import { AtList, AtListItem } from "taro-ui";

import "./confirmOrder.scss";
import "./detail.scss";

@inject("orderStore")
@observer
export default class Detail extends Component {
  config = {
    navigationBarTitleText: "订单详情",
  };

  @observable store = {
    order: {},
  };

  componentDidMount() {
    const { orderStore: oStore } = this.props;
    const id = this.$router.params.id;
    try {
      oStore.getOrderDetail(id).then((res) => {
        this.store.order = res.ret;
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { order = {} } = this.store;
    const { food = [], restaurant = {}, address = {} } = order;
    const { address: orderAddress = {} } = address;
    console.error(order.status);
    return (
      <View className="page">
        <View className="cart_group">
          <AtList>
            <AtListItem
              title="订单状态"
              extraText={order.status >= 1 ? "订单已完成" : "订单已取消"}
            />
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
            <AtListItem title="送达时间" extraText={order.arriveTime} />
            <AtListItem
              title="收货地址"
              extraText={orderAddress.address + orderAddress.name}
            />
            <AtListItem title="收货电话" extraText={address.phone} />
            <AtListItem title="收货人姓名" extraText={address.name} />
            <AtListItem
              title="就餐方式"
              extraText={order.way === 2 ? "骑手配送" : "堂食"}
            />
            <AtListItem title="订单号" extraText={order._id} />
            <AtListItem title="支付方式" extraText="在线支付" />
            <AtListItem
              title="下单时间"
              extraText={formatDate(order.creatAt)}
            />
          </AtList>
        </View>
      </View>
    );
  }
}

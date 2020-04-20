import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button, Picker } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtList, AtListItem, AtIcon, AtRadio, AtInput } from "taro-ui";
import moment from "moment";
import { getImageUrl } from "@/service/utils";
import "./confirmOrder.scss";

const tableware = [
  "无需餐具",
  "1份",
  "2份",
  "3份",
  "4份",
  "5份",
  "6份",
  "7份",
  "8份",
  "9份",
  "10份",
  "10份以上",
];

@inject("shoppingCartStore", "restaurantStore", "orderStore", "userStore")
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "确认订单",
  };

  @observable store = {
    way: "1",
    selectorChecked: 0,
    tableNumber: "",
    shoppingCart: [],
    rst: [],
    arriveTime: "",
    order: {},
  };

  componentDidMount() {
    const { shoppingCartStore: sStore, restaurantStore: rStore } = this.props;
    this.store.shoppingCart = sStore;
    this.store.rst = rStore.currentRestraurant;
    this.store.arriveTime = `${moment().add(40, "minutes").format("HH:mm")}`;
  }

  handleWayChange = (value) => {
    this.store.way = value;
  };

  onArriveTimeChange = (e) => {
    this.store.arriveTime = e.detail.value;
  };
  handleTableNumberChange = (value) => {
    this.store.tableNumber = value;
  };

  toRemark = () => {
    const { orderStore } = this.props;
    const { arriveTime, tableNumber, selectorChecked, way } = this.store;
    orderStore.saveOrder({
      arriveTime,
      tableNumber,
      way,
      tableware: selectorChecked,
    });
    Taro.navigateTo({ url: "/pages/order/remark" });
  };

  onTableWareChange = (e) => {
    console.error(e.detail.value);
    this.store.selectorChecked = e.detail.value;
  };

  handleSelectAddress = (e) => {
    Taro.navigateTo({ url: "/pages/address/selectOrderAddress" });
  };

  handleToPay = async () => {
    const {
      userStore: uStore,
      orderStore: oStore,
      shoppingCartStore: sStore,
      restaurantStore: rStore,
    } = this.props;
    const userAddress = uStore.defaultAddress;
    const { way, tableNumber, arriveTime, selectorChecked } = this.store;
    const { foodItem = [], price } = sStore;
    let errorText = "";
    if (way === "1" && !tableNumber) {
      errorText = "请输入桌号";
    } else if (Object.keys(userAddress).length <= 0) {
      errorText = "请输入送达地址";
    }
    if (errorText) {
      Taro.showToast({
        title: errorText,
        duration: 5000,
      });
      return;
    }
    const {
      image_path,
      name,
      _id,
      latitude,
      longitude,
    } = rStore.currentRestraurant;
    console.error(rStore.currentRestraurant);
    console.error("oStore", toJS(oStore));
    try {
      Taro.showLoading();
      const doc = await oStore.saveUserOrder({
        address: userAddress,
        arriveTime,
        way,
        tableNumber,
        tableware: tableware[selectorChecked],
        remark: oStore.remark,
        food: foodItem,
        money: price,
        restaurant: {
          image_path,
          name,
          latitude,
          longitude,
          id: _id,
        },
        creatAt: new Date(),
      });
      if (doc.error) {
        Taro.showModal({
          title: "错误",
          content: doc.msg,
        });
        return;
      } else {
        Taro.showToast({
          title: "支付成功",
          icon: "success",
          duration: 5000,
        });
        Taro.navigateTo({ url: "/pages/goods/index" });
      }
    } catch (e) {
    } finally {
      Taro.hideLoading();
    }
  };

  render() {
    const { userStore: uStore, orderStore: oStore } = this.props;
    const {
      way,
      selectorChecked,
      tableNumber,
      shoppingCart,
      rst,
      arriveTime,
    } = this.store;
    const order = oStore.order;
    const userAddress = uStore.defaultAddress;
    const { address = {} } = userAddress;
    const { foodItem = [], price } = shoppingCart;
    console.error(arriveTime);
    return (
      <View className="page">
        <View className="order-content">
          <View className="cart_address">
            <View className="address_item">
              <Text>订单配送至</Text>
              {Object.keys(userAddress).length <= 0 ? (
                <View>
                  <Text
                    className="selectAddress"
                    onClick={this.handleSelectAddress}
                  >
                    选择收货地址
                  </Text>
                  <AtIcon value="chevron-right" size="24" color="#fff"></AtIcon>
                </View>
              ) : (
                <View>
                  <View
                    className="address_detail"
                    onClick={this.handleSelectAddress}
                  >
                    <Text>{address.name}</Text>
                    <AtIcon
                      value="chevron-right"
                      size="24"
                      color="#fff"
                    ></AtIcon>
                  </View>
                  <View className="address_name">
                    <Text>{userAddress.name}</Text>
                    <Text>({userAddress.sex})</Text>
                    <Text>{userAddress.phone}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View className="key_card">
            <View className="delivery">
              <Picker mode="time" onChange={this.onArriveTimeChange}>
                <View className="picker">
                  <Text className="delivery_left">送达时间</Text>
                  <Text className="delivery_right">
                    尽快送达({arriveTime || order.arriveTime}送达)
                  </Text>
                </View>
              </Picker>
            </View>
            <View className="pay_way">
              <Text>支付方式</Text>
              <Text className="right">在线支付</Text>
            </View>
          </View>

          <View className="cart_group">
            <View className="cart_group1">{rst.name}</View>
            {foodItem.length > 0 &&
              foodItem.map((food) => (
                <View className="cart_group2">
                  <Image
                    className="cart_image"
                    src={getImageUrl(food.image_path)}
                  />
                  <Text className="cart_rname">{food.name}</Text>
                  <Text className="cart_num">× {food.num}</Text>
                  <Text className="cart_price">¥{food.fprice}</Text>
                </View>
              ))}
          </View>
          <View className="deliver_setting">
            <AtRadio
              options={[
                { label: "在店内吃", value: "1", desc: "在店内吃需提供桌号" },
                { label: "骑手运送", value: "2" },
              ]}
              value={way || order.way}
              onClick={this.handleWayChange.bind(this)}
            />
            {way === "1" && (
              <AtInput
                title="桌号"
                type="text"
                placeholder="请输入桌号"
                value={tableNumber || order.tableNumber}
                onChange={this.handleTableNumberChange.bind(this)}
              />
            )}
          </View>

          <View className="other_section">
            <View className="picker_section">
              <View>
                <Picker
                  mode="selector"
                  range={tableware}
                  onChange={this.onTableWareChange}
                >
                  <View className="picker">
                    <Text> 餐具份数:</Text>
                    <Text>
                      {tableware[selectorChecked] || tableware[order.tableware]}
                    </Text>
                  </View>
                </Picker>
              </View>
            </View>
            <AtList>
              <AtListItem
                title="订单备注"
                extraText={order.remark ? order.remark : "口味、偏好"}
                arrow="right"
                onClick={this.toRemark}
              />
            </AtList>
          </View>
        </View>
        <View className="footer">
          <Text className="price">¥{price}</Text>
          <Button className="topay" onClick={this.handleToPay}>
            去支付
          </Button>
        </View>
      </View>
    );
  }
}

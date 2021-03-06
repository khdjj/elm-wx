import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import CartFoodItem from "./cartFoodItem";
import { getImageUrl, formatDistance, getDistance } from "@/service/utils";
import { AtCurtain, AtFloatLayout, AtIcon } from "taro-ui";

import "./detailHeader.scss";

@inject("shoppingCartStore", "userStore")
@observer
export default class DetailHeader extends Component {
  @observable store = {
    curtainIsOpened: false,
    floatLayoutIsOpened: false,
    isOpened: false,
    distance: 0,
    isAllowDelivery: false,
  };

  componentDidMount() {}

  getShopDistance() {
    const { rst = {}, userStore } = this.props;
    const address = userStore.selectAddress;
    return formatDistance(
      getDistance(
        { longitude: address.longitude, latitude: address.latitude },
        { longitude: rst.longitude, latitude: rst.latitude }
      )
    );
  }

  onSearch = () => {};

  handleOpenCurtain = () => {
    const { curtainIsOpened } = this.store;
    this.store.curtainIsOpened = !curtainIsOpened;
  };

  handleOpenFloatLayout = () => {
    const { floatLayoutIsOpened } = this.store;
    this.store.floatLayoutIsOpened = !floatLayoutIsOpened;
  };

  handleClose = () => {
    const { isOpened } = this.store;
    this.store.isOpened = !isOpened;
  };

  getDifference = (price, minprice) => {
    if (price <= 0) return minprice;
    const diff = minprice - price;
    if (diff < 0) {
      this.store.isAllowDelivery = true;
      return 0;
    }
    return diff;

  };

  handletoPay = () => {
    Taro.navigateTo({ url: "/pages/order/confirmOrder" });
  };

  render() {
    const { curtainIsOpened, isOpened, isAllowDelivery } = this.store;
    const { rst = {} } = this.props;
    const { shoppingCartStore: sStore } = this.props;
    const { foodItem, price, visible } = sStore;
    const { shop_sign = {} } = rst;
    return (
      <View>
        <View className="headerBanner">
          <View className="nav_image">
            <Image src={getImageUrl(shop_sign.image_hash, rst.tag)} />
          </View>
          <View className="shop_detail">
            <View className="shop_logo">
              <Image src={getImageUrl(rst.image_path, rst.tag)} />
            </View>
            {/* 店名及详情 */}
            <View className="shop_name">
              <Text className="name" onClick={this.handleOpenCurtain}>
                {rst.name}
              </Text>
              <View className="introduction">
                <Text>评价:{rst.rating || 5} </Text>
                <Text>月售:{rst.recent_order_num || 0}单</Text>
                <Text>
                  商家配送:<Text>约{rst.order_lead_time}分钟</Text>
                </Text>
              </View>
            </View>
          </View>
          <AtCurtain
            isOpened={curtainIsOpened}
            onClose={this.handleOpenCurtain}
          >
            <View className="curtain_content">
              <Text className="shop_name">{rst.name}</Text>
              <View className="detail">
                <View className="item">
                  <Text className="item_value">{rst.rating || 5}</Text>
                  <Text className="item_label">评分</Text>
                </View>
                <View className="item">
                  <Text className="item_value">
                    {rst.recent_order_num || 0}单
                  </Text>
                  <Text className="item_label">月售</Text>
                </View>
                <View className="item">
                  <Text className="item_value">商家配送</Text>
                  <Text className="item_label">
                    约{rst.order_lead_time}分钟
                  </Text>
                </View>
                <View className="item">
                  <Text className="item_value">{rst.float_delivery_fee}元</Text>
                  <Text className="item_label">配送费</Text>
                </View>
                <View className="item">
                  <Text className="item_value">{this.getShopDistance()}</Text>
                  <Text className="item_label">距离</Text>
                </View>
              </View>
              <View className="notice">
                <Text className="notice_title">公告</Text>
              </View>
              <Text className="notice_content">{rst.promotion_info}</Text>
            </View>
          </AtCurtain>
        </View>
        {visible && (
          <View className="footer">
            <View className="shopping_icon">
              {foodItem.length > 0 ? (
                <AtIcon value="shopping-cart" size="40" color="#3190e8" />
              ) : (
                <AtIcon value="shopping-cart" size="40" color="#eee" />
              )}
            </View>
            <Text
              onClick={this.handleClose.bind(this)}
              className="bottomNav_carttotal"
            >
              ¥{price}
            </Text>
            {isAllowDelivery ? (
              <Button className="settlement_btn" onClick={this.handletoPay}>
                去结算
              </Button>
            ) : (
              <View className="submit_btn">
                还差¥{this.getDifference(price, rst.float_minimum_order_amount)}
                起送
              </View>
            )}
          </View>
        )}

        <AtFloatLayout
          isOpened={isOpened}
          title="已选商品"
          onClose={this.handleClose.bind(this)}
        >
          {foodItem.length > 0 &&
            foodItem.map((f) => <CartFoodItem food={f} />)}
        </AtFloatLayout>
      </View>
    );
  }
}

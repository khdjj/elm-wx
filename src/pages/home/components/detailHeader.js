import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import CartFoodItem from "./cartFoodItem";
import shopBg from "@/images/banner.jpg";
import { getImageUrl, formatDistance } from "@/service/utils";
import { AtCurtain, AtFloatLayout, AtIcon } from "taro-ui";

import "./detailHeader.scss";

@inject("shoppingCartStore")
@observer
export default class DetailHeader extends Component {
  @observable store = {
    curtainIsOpened: false,
    floatLayoutIsOpened: false,
    isOpened: false,
  };

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

  handletoPay = () => {
    Taro.navigateTo({ url: "/pages/order/confirmOrder" });
  };

  render() {
    const { curtainIsOpened, floatLayoutIsOpened, isOpened } = this.store;
    const { rst = {} } = this.props;
    const { shoppingCartStore: sStore } = this.props;
    const { foodItem, price, isAllowDelivery, difference } = sStore;
    const { shop_sign = {} } = rst;
    return (
      <View>
        <View className="headerBanner">
          <View className="nav_image">
            <Image src={getImageUrl(shop_sign.image_hash, rst.tag)} />
          </View>
          <View className="shop_detail">
            <View className="shop_logo">
              <Image src={getImageUrl(rst.image_path,rst.tag)} />
            </View>
            {/* 店名及详情 */}
            <View className="shop_name">
              <Text className="name" onClick={this.handleOpenCurtain}>
                {rst.name}
              </Text>
              <View className="introduction">
                <Text>评价:{rst.rating}</Text>
                <Text>月售:{rst.recent_order_num}单</Text>
                <Text>
                  商家配送:<Text>约{rst.order_lead_time}分钟</Text>
                </Text>
              </View>
            </View>
            {/* 红包 */}
            {/* <View style="display:flex;flex-direction:row">
              <View className="welfare">
                <Text className="detail">
                  共<Text className="money">￥32</Text>
                  <Text className="get_money">领取</Text>
                </Text>
              </View>
              {/* 优惠 */}
            {/* <View className="discount" onClick={this.handleOpenFloatLayout}>
                查看优惠
              </View>
            </View> * */}
          </View>

          {/* 幕帘 */}
          <AtCurtain
            isOpened={curtainIsOpened}
            onClose={this.handleOpenCurtain}
          >
            <View className="curtain_content">
              <Text className="shop_name">{rst.name}</Text>
              <View className="detail">
                <View className="item">
                  <Text className="item_value">{rst.rating}</Text>
                  <Text className="item_label">评分</Text>
                </View>
                <View className="item">
                  <Text className="item_value">{rst.recent_order_num}单</Text>
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
                  <Text className="item_value">
                    {formatDistance(rst.distance)}
                  </Text>
                  <Text className="item_label">距离</Text>
                </View>
              </View>
              <View className="notice">
                <Text className="notice_title">公告</Text>
              </View>
              <Text className="notice_content">{rst.promotion_info}</Text>
            </View>
          </AtCurtain>

          {/* <AtFloatLayout
            isOpened={floatLayoutIsOpened}
            title="优惠活动"
            onClose={this.handleOpenFloatLayout.bind(this)}
          >
            <View className="activity_sheet">
              <Text>
                满25元减1元，满35元减5元，满62元减12元，满120元减28元，满300元减70元
              </Text>
              <Text>超级会员领6元无门槛红包</Text>
            </View>
            
          </AtFloatLayout> */}
        </View>
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
            <View className="submit_btn">还差¥{difference}起送</View>
          )}
        </View>
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

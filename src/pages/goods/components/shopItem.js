import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { AtIcon, AtDrawer, AtRate, AtDivider } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { sortTypes, sortItems } from "@/consts/sort";
import { getImageUrl, formatDistance } from "@/service/utils";
import "./shopItem.scss";

@observer
export default class Main extends Component {
  @observable store = {};

  handleToDetail = () => {
    Taro.navigateTo({ url: `/pages/goods/detail?id=${299}` });
  };
  render() {
    const { items = {} } = this.props;
    const { restaurant = {} } = items;
    const { delivery_mode } = restaurant;
    return (
      <View className="shop-item" onClick={this.handleToDetail}>
        <View className="shop-info">
          <View className="shop-logo">
            <Image
              className="shop-logo-img"
              src={`https://cube.elemecdn.com/${getImageUrl(
                restaurant.image_path
              )}?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed`}
            />
          </View>
          <View className="shop-main">
            <View className="shop-main_title">{restaurant.name}</View>
            <View className="shop-main_info">
              <View className="rateWrap">
                <AtRate value={3.5} size={12} />
                <Text className="rate">{restaurant.rating}</Text>
                <Text>月售{restaurant.recent_order_num}单</Text>
              </View>
              <View className="delivery-delivery">{delivery_mode.text}</View>
            </View>
            <View className="shop-main_info">
              <View className="moneylimit">
                <Text className="divider">
                  ¥{restaurant.float_minimum_order_amount}起送
                </Text>
                <Text>配送费{restaurant.float_delivery_fee}</Text>
              </View>
              <View className="timedistanceWrap">
                <Text className="divider">
                  {formatDistance(restaurant.distance)}
                </Text>
                <Text>{restaurant.order_lead_time}分钟</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="shop-activity">
          <View className="tagLine">
            {(restaurant.support_tags || []).map((item, index) => (
              <Text className="tag">{item.text}</Text>
            ))}
          </View>
          <AtDivider height={30} />
          {/* <View className="activities">
            <View className="activityList">
              <View className="actRow">
                <View className="iconWrap">折</View>
                <Text className="desc">
                  满20减11，满37减18，满55减23，满110减44
                </Text>
              </View>
              <View className="actRow">
                <View className="iconWrap">折</View>
                <Text className="desc">
                  满20减11，满37减18，满55减23，满110减44
                </Text>
              </View>
            </View>
            <View className="activityBtn"></View>
          </View> */}
        </View>
      </View>
    );
  }
}

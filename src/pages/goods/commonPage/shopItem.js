import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { AtIcon, AtDrawer, AtRate, AtDivider } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { sortTypes, sortItems } from "@/consts/sort";
import { getImageUrl, formatDistance } from "@/service/utils";
import "./shopItem.scss";

@observer
export default class ShopItem extends Component {
  @observable store = {};
  handleToDetail = (rst) => {
    Taro.navigateTo({ url: `/pages/home/detail?name=${rst.name}` });
  };
  render() {
    const { items = {} } = this.props;
    return (
      <View className="shop-item" onClick={() => this.handleToDetail(items)}>
        <View className="shop-info">
          <View className="shop-logo">
            <Image
              className="shop-logo-img"
              src={getImageUrl(items.image_path, items.tag)}
            />
          </View>
          <View className="shop-main">
            <View className="shop-main_title">{items.name}</View>
            <View className="shop-main_info">
              <View className="rateWrap">
                <AtRate value={3.5} size={12} />
                <Text className="rate">{items.rating}</Text>
                <Text>月售{items.recent_order_num || 0}单</Text>
              </View>
            </View>
            <View className="shop-main_info">
              <View className="moneylimit">
                <Text className="divider">
                  ¥{items.float_minimum_order_amount}起送
                </Text>
                <Text>配送费{items.float_delivery_fee}</Text>
              </View>
              <View className="timedistanceWrap">
                <Text className="divider">
                  {formatDistance(items.distance)}
                </Text>
                <Text>{items.order_lead_time}分钟</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="shop-activity">
          <View className="tagLine">
            {(items.support_tags || []).map((item, index) => (
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

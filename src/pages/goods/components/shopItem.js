import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { AtIcon, AtDrawer, AtRate, AtDivider } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { sortTypes, sortItems } from "@/consts/sort";
import "./shopItem.scss";

@observer
export default class Main extends Component {
  @observable store = {};
  handleToDetail = () => {
    Taro.navigateTo({ url: `/pages/goods/detail?id=${299}` });
  };
  render() {
    const { show, sort } = this.store;
    return (
      <View className="shop-item" onClick={this.handleToDetail}>
        <View className="shop-info">
          <View className="shop-logo">
            <Image
              className="shop-logo-img"
              src="https://cube.elemecdn.com/1/59/c5fa2ae6102b0ef0e66fdb928c377png.png?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed"
            />
          </View>
          <View className="shop-main">
            <View className="shop-main_title">传记潮发牛肉店(五羊邨店)</View>
            <View className="shop-main_info">
              <View className="rateWrap">
                <AtRate value={3.5} size={12} />
                <Text className="rate">3.5</Text>
                <Text>月售4333单</Text>
              </View>
              <View className="delivery-delivery">蜂鸟专送</View>
            </View>
            <View className="shop-main_info">
              <View className="moneylimit">
                <Text className="divider">¥20起送</Text>
                <Text>配送费¥0.5</Text>
              </View>
              <View className="timedistanceWrap">
                <Text className="divider">2.19km</Text>
                <Text>33分钟</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="shop-activity">
          <View className="tagLine">
            <Text className="tag">牛肉火锅</Text>
            <Text className="tag">支持自取</Text>
            <Text className="tag">品质联盟</Text>
          </View>
          <AtDivider height={30} />
          <View className="activities">
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
          </View>
        </View>
      </View>
    );
  }
}

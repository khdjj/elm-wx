import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtButton } from "taro-ui";
import "./order.scss";

@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的订单"
  };

  render() {
    return (
      <View className="page">
        <View className="ordercard">
          <View className="ordercard-body">
            <View className="ordercard-avatar">
              <Image src="https://cube.elemecdn.com/7/7b/7b3176410ab30f09a3dc459861030jpeg.jpeg?x-oss-process=image/format,webp/resize,w_64,h_64,m_fixed" />
            </View>
            <View className="ordercard-content">
              <View className="ordercard-head">
                <View className="title">
                  <Text className="name">每日优鲜（杨箕店）</Text>
                  <Text className="status">订单已送达</Text>
                </View>
                <Text className="datetime">2019-12-19 10:51</Text>
              </View>
              <View className="ordercard-detail">
                  <Text className="detail">无骨老坛酸菜鱼+靓米饭. </Text>
                  <Text className="price">¥15.48</Text>
              </View>
              <View className="ordercard-bottom">
              <Button className="cardbutton">再来一单</Button>
              </View>
            </View>
          </View>
        </View>
        <View className="ordercard">
          <View className="ordercard-body">
            <View className="ordercard-avatar">
              <Image src="https://cube.elemecdn.com/7/7b/7b3176410ab30f09a3dc459861030jpeg.jpeg?x-oss-process=image/format,webp/resize,w_64,h_64,m_fixed" />
            </View>
            <View className="ordercard-content">
              <View className="ordercard-head">
                <View className="title">
                  <Text className="name">每日优鲜（杨箕店）</Text>
                  <Text className="status">订单已送达</Text>
                </View>
                <Text className="datetime">2019-12-19 10:51</Text>
              </View>
              <View className="ordercard-detail">
                  <Text className="detail">无骨老坛酸菜鱼+靓米饭. </Text>
                  <Text className="price">¥15.48</Text>
              </View>
              <View className="ordercard-bottom">
              <Button className="cardbutton">再来一单</Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Divider from "@/components/divider";
import { observer, inject } from "@tarojs/mobx";

import "./addressList.scss";

@observer
export default class Index extends Component {
  render() {
    return (
      <View>
        <View className="list-container">
          <View className="left-container">
            <View className="per-msg">
              <Text className="name" decode>
                柳海杰&nbsp;&nbsp;&nbsp;(女士)
              </Text>
              <Text className="per-company">15874496073</Text>
            </View>
            <Text className="per-address">广州图书馆</Text>
          </View>
        </View>
        <Divider />
      </View>
    );
  }
}

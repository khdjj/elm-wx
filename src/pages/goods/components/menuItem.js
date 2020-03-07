import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { getImageUrl } from "@/service/utils";
import { AtIcon } from "taro-ui";

import "./menuItem.scss";

@observer
export default class Index extends Component {
  render() {
    const { food } = this.props;
    return (
      <View className="menuitem">
        <View className="fooddetails">
          <View className="fooddetails_logo">
            <Image
              src={`https://cube.elemecdn.com/${getImageUrl(
                food.image_path
              )}?x-oss-process=image/format,webp/resize,w_686`}
            />
          </View>
          <View className="fooddetails_info">
            <Text className="fooddetails_name">{food.name}</Text>
            <View className="fooddetails_desc">{food.materials}</View>
            <View className="fooddetails_sales">
              <Text>月售{food.month_sales}份</Text>
              <Text> 好评率{food.satisfy_rate}</Text>
            </View>
            <View className="salesInfo_price">
              <Text>￥{food.lowest_price}</Text>
              <Text className="salesInfo_originPrice">￥43.9</Text>
              <AtIcon value="add-circle" size="30" color="#2396ff"></AtIcon>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

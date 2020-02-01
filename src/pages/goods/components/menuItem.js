import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtIcon } from "taro-ui";

import "./menuItem.scss";

@observer
export default class Index extends Component {
  render() {
    return (
      <View className="menuitem">
        <View className="fooddetails">
          <View className="fooddetails_logo">
            <Image src="https://cube.elemecdn.com/f/64/86515818273ed0a43d1cec81dbc8ajpeg.jpeg?x-oss-process=image/resize,m_lfit,w_105,h_105/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp" />
          </View>
          <View className="fooddetails_info">
            <Text className="fooddetails_name">牛肉粉丝汤+2两锅贴（10只）</Text>
            <View className="fooddetails_desc">主要原料：红薯</View>
            <View className="fooddetails_sales">
              <Text>月售999份</Text>
              <Text> 好评率97%</Text>
            </View>
            <View className="salesInfo_price">
              <Text>￥19.8</Text>
              <Text className="salesInfo_originPrice">￥43.9</Text>
              <AtIcon value="add-circle" size="30" color="#2396ff"></AtIcon>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

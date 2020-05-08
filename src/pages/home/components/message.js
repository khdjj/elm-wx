import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtRate, AtList, AtListItem } from "taro-ui";
import userIcon from "@/images/timg.jpg";
import { getImageUrl } from "@/service/utils";

import "./message.scss";

@observer
@inject("commendStore")
export default class Message extends Component {
  @observable store = {};

  render() {
    const { restaurant = {} } = this.props;
    const { qualification = [], albums = [], category = [] } = restaurant;
    console.error(qualification);
    console.error(albums.length, qualification.length);
    return (
      <View className="messageContent">
        {albums.length > 0 && albums[0] && (
          <View className="cardConent">
            <View className="h3">商家实景</View>
            <View>
              {albums.map((qualfy) => (
                <Image src={getImageUrl(qualfy)} className="images" />
              ))}
            </View>
          </View>
        )}

        {qualification.length > 0 && qualification[0] && (
          <View className="cardConent">
            <View className="h3">营业资质</View>
            <View>
              {qualification.map((qualfy) => (
                <Image src={getImageUrl(qualfy)} className="images" />
              ))}
            </View>
          </View>
        )}
        <View className="cardConent">
          <View className="h3">商家信息</View>
          <View className="desc">{restaurant.description}</View>
          <View>
            <AtList>
              <AtListItem title={"品类"} extraText={category.join(",")} />
              <AtListItem title={"商家电话"} extraText={restaurant.phone} />
              <AtListItem title={"地址"} extraText={restaurant.address} />
              <AtListItem
                title={"营业时间"}
                extraText={`${restaurant.startTime}-${restaurant.endTime}`}
              />
            </AtList>
          </View>
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button, Textarea } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtRate, AtList, AtListItem, AtImagePicker } from "taro-ui";
import { getImageUrl } from "@/service/utils";

import "./commend.scss";
import "./confirmOrder.scss";

@inject("orderStore", "globalStore", "commendStore")
@observer
export default class Detail extends Component {
  config = {
    navigationBarTitleText: "评价订单",
  };

  @observable store = {
    order: {},
    rate: 0,
    rateText: "",
    files: [],
    rateImages: [],
  };

  componentDidMount() {
    const { orderStore: oStore } = this.props;
    const { order = {} } = oStore;
    const { commendOrder } = order;
    this.store.order = commendOrder;
  }

  handleRateTextChange = (e) => {
    this.store.rateText = e.detail.value;
  };

  onhaneleRateImagesChange = (data = []) => {
    const { globalStore: gStore } = this.props;
    const { rateImages } = this.store;
    const promiseArr = [];
    data.forEach((f) => {
      promiseArr.push(gStore.uploadFile(f.file.path));
    });
    Promise.all(promiseArr).then((result) => {
      result.forEach((r) => {
        rateImages.push(r.imgPath);
      });
      this.store.rateImages = rateImages;
      this.store.files = data;
    });
  };

  handleRageChange = (value) => {
    this.store.rate = value;
  };

  handleSubmitCommend = () => {
    const { globalStore: gStore, commendStore: cStore } = this.props;
    const { order, rateImages, rateText, rate } = this.store;
    cStore
      .saveCommend({
        rating: rate,
        rated_at: new Date(),
        raging_images: rateImages,
        rating_text: rateText,
        food: order.food,
        orderId: order._id,
        rstId: order.restaurant.id,
      })
      .then((res) => {
        if (!res.error) {
          Taro.navigateTo({ url: "/pages/goods/index" });
        }
      });
  };

  render() {
    const { rate, order, files = [] } = this.store;
    const { food = [], restaurant = {} } = order;
    return (
      <View className="page">
        <AtList>
          <AtListItem title="店铺名称" extraText={restaurant.name} />
          <View className="cart_group">
            {food.length > 0 &&
              food.map((f) => (
                <View className="cart_group2">
                  <Image
                    className="cart_image"
                    src={getImageUrl(f.image_path)}
                  />
                  <Text className="cart_rname">{f.name}</Text>
                  <Text className="cart_num">× {f.num}</Text>
                  <Text className="cart_price">¥{f.fprice}</Text>
                </View>
              ))}
          </View>
        </AtList>
        <View className="title">您的评级是什么呢</View>
        <AtRate value={rate} onChange={this.handleRageChange} />
        <View className="title">请输入对此订单的评价</View>
        <Textarea
          autoFocus
          placeholder="请输入评价"
          onInput={(e) => this.handleRateTextChange(e)}
        ></Textarea>
        <View className="title">您要上传评论图片吗</View>
        <AtImagePicker
          files={files}
          length={5}
          multiple
          onChange={this.onhaneleRateImagesChange}
        />
        <Button className="submit" onClick={this.handleSubmitCommend}>
          提交评价
        </Button>
      </View>
    );
  }
}

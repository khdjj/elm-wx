import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button, Picker } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtTextarea } from "taro-ui";
import { getImageUrl } from "@/service/utils";
import "./remark.scss";

@inject("orderStore")
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "订单备注"
  };

  @observable store = {
    remark: ""
  };

  handleChange = e => {
    this.store.remark = e.target.value;
  };

  handleToOrder = () => {
    const { remark } = this.store;
    const { orderStore } = this.props;
    orderStore.saveOrder({ remark });
    Taro.navigateTo({ url: "/pages/order/confirmOrder" });
  };

  render() {
    const { remark } = this.store;
    return (
      <View className="page">
        <AtTextarea
          value={remark}
          onChange={this.handleChange.bind(this)}
          maxLength={500}
          placeholder="填写额外对餐厅和骑士小哥备注的信息..."
        />
        <Button className="btn" onClick={this.handleToOrder}>
          确定
        </Button>
      </View>
    );
  }
}

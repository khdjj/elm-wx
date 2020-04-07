import { observable } from "mobx";
import { floatAdd, floatSub } from "@/service/utils";
import request from "@/service/request";

const store = observable({
  order: {
    orderList: [],
    remark: "",
    arriveTime: "",
    tableNumber: "",
    tableware: "",
    way: ""
  },

  async saveOrder(params) {
    this.order = {
      ...this.order,
      ...params
    };
  },

  async saveUserOrder(params) {
    const doc = await request("/order/v1/saveUser", "POST", {
      ...params
    });
    return doc;
  },

  async getOrderList(params){
    const doc = await request("/order/v1/list","GET");
    return doc;
  }


});

export default store;

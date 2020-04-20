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
    way: "",
    commendOrder: {},
  },

  async saveOrder(params) {
    this.order = {
      ...this.order,
      ...params,
    };
  },

  

  async saveUserOrder(params) {
    const doc = await request("/order/v1/saveUser", "POST", {
      ...params,
    });
    return doc;
  },

  async getOrderList() {
    const doc = await request("/order/v1/list", "GET");
    return doc;
  },

  async changeOrderStatus(id, status) {
    const doc = await request("/order/v1/change/status", "POST", {
      id,
      status,
    });
    return doc;
  },

  async getOrderDetail(id) {
    const doc = await request("/order/v1/detail", "GET", {
      id,
    });
    return doc;
  },
});

export default store;

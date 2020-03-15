import { observable } from "mobx";
import { floatAdd, floatSub } from "@/service/utils";

const store = observable({
  order: {
    orderList: [],
    remark: "",
    arriveTime: "",
    tableNumber:'',
    tableware: '',
    way: ''
  },

  async saveOrder(params) {
    this.order = {
        ...this.order,
        ...params,
    }
    console.error('order',this.order)
  }
});

export default store;

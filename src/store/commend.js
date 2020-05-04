import { observable } from "mobx";
import { floatAdd, floatSub } from "@/service/utils";
import request from "@/service/request";

const store = observable({
  async saveCommend(params) {
    const doc = await request("/commend/v2/order", "POST", {
      ...params,
    });
    return doc;
  },
  async getCommendList(id) {
    const doc = await request(`/commend/v2/restaurant?id=${id}`, "GET");
    return doc;
  },
});

export default store;

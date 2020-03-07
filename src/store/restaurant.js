import { observable } from "mobx";
import request from "@/service/request";

const store = observable({
  currentRestraurant: {},
  async getRestaurant(params) {
    console.error("getRestaurant", params);
    const doc = await request("/restapi/shopping/v3/restaurants", "POST", {
      ...params
    });
    return doc;
  },
  async getRestaurantDetail(params) {
    console.error("getRestaurantDetail", params);
    const doc = await request("/restapi/shopping/detail/restaurants", "POST", {
      ...params
    });
    return doc;
  }
});

export default store;

import { observable } from "mobx";
import request from "@/service/request";

const store = observable({
  currentRestraurant: {},
  async getRestaurant(params) {
    const doc = await request("/restapi/shopping/v3/restaurants", "POST", {
      ...params,
    });
    return doc;
  },
  async getRestaurantDetail(name) {
    const doc = await request(
      "/restapi/shopping/detail/restaurants",
      "GET",
      name
    );
    return doc;
  },
});

export default store;

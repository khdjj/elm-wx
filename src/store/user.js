import { observable } from "mobx";
import request from "@/service/request";

const store = observable({
  latitude: "",
  longitude: "",
  async getCode(phone) {
    const doc = await request("/user/getCode", "POST", {
      phone
    });
    return doc;
  },

  async bindAccount(phone, code) {
    const doc = await request("/user/bindAccount", "POST", {
      phone,
      code
    });
    return doc;
  }
});

export default store;

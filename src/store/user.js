import { observable } from "mobx";
import request from "@/service/request";

const store = observable({
  latitude: "",
  longitude: "",
  addressList: [],
  currentAddress: {},
  defaultAddress: {},
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
  },

  async saveCurrentAddress(address) {
    this.currentAddress = {
      ...address
    };
    const doc = await request("/address/v1/saveUser", "POST", {
      ...address
    });
    return doc;
  }
});

export default store;

import { observable } from "mobx";
import request from "@/service/request";
import { getLocalItem } from "@/service/utils";
import Taro from "@tarojs/taro";

const store = observable({
  latitude: "",
  longitude: "",
  addressList: [],
  userInfo: {},
  city: "",
  selectAddress: {},
  currentAddress: {},
  defaultAddress: {},

  async getUserInfo() {
    const doc = await request("/user/getUserInfo", "GET");
    console.error('getUserInfo',doc)
    return doc;
  },

  async getSso() {
    return new Promise((resolve, reject) => {
      try {
        getLocalItem("sso").then((res) => {
          resolve(res);
        });
      } catch (e) {
        console.error("error", e);
      }
    });
  },

  async getCode(phone) {
    const doc = await request("/user/getCode", "POST", {
      phone,
    });
    return doc;
  },

  async bindAccount(phone, code) {
    const doc = await request("/user/bindAccount", "POST", {
      phone,
      code,
    });
    return doc;
  },

  async saveUserInfo(data) {
    console.error(data);
    const doc = await request("/user/saveUserInfo", "POST", {
      weapp: data,
    });
    return doc;
  },

  async saveCurrentAddress(address) {
    this.currentAddress = address;
  },

  async saveCurrentAddressAndSend(address) {
    this.currentAddress = {
      ...address,
    };
    const doc = await request("/address/v1/saveUser", "POST", {
      ...address,
    });
    return doc;
  },

  async getUserAddress() {
    const doc = await request("/address/v1/list", "GET");
    return doc;
  },

  async deleteUserAddress(params) {
    console.error(params);
    const doc = await request("/address/v1/delete", "POST", {
      ...params,
    });
    return doc;
  },

  async getUserAddressByAmap(address) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: "https://restapi.amap.com/v3/geocode/regeo",
        data: {
          key: "678d49ca49ed666489097743d61d1434",
          location: `${address.longitude},${address.latitude}`,
        },
        method: "GET",
        success: (res) => {
          resolve(res.data);
        },
        fail: () => {
          Taro.showToast({
            title: "网络错误",
          });
        },
      });
    });
  },

  async searchUserAddress(search, city) {
    console.error(city, search);
    return new Promise((resolve, reject) => {
      Taro.request({
        url: "https://restapi.amap.com/v3/assistant/inputtips",
        data: {
          key: "678d49ca49ed666489097743d61d1434",
          keywords: search,
          city,
        },
        method: "GET",
        success: (res) => {
          resolve(res.data);
        },
        fail: () => {
          Taro.showToast({
            title: "网络错误",
          });
        },
      });
    });
  },

  async editUserAddress(params) {
    console.error(params);
    const doc = await request("/address/v1/edit", "POST", {
      ...params,
    });
    return doc;
  },
});

export default store;

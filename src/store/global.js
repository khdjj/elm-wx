import { observable } from "mobx";
import request from "@/service/request";
import { getLocalItem } from "@/service/utils";
import Taro from "@tarojs/taro";

const baseUrl = "http://localhost:8001";
const store = observable({
  uploadFile(file) {
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: `${baseUrl}/upload/img`,
        filePath: file,
        name: "file",
        success: (res) => {
          console.error(JSON.parse(res.data))
          resolve(JSON.parse(res.data));
        },
        fail: (err) => {
          reject(err);  
        },
      });
    });
  },
});

export default store;

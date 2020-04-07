import Taro from "@tarojs/taro";
import { getLocalItem } from "@/service/utils";

const baseUrl = "http://localhost:8001";

// const h = {
//   Accept: "application/json",
//   "content-type": "application/json",
//   Authorization: (getLocalItem("otken") || {})
// };

async function getAuthorzation(url, callback) {
  if (url.indexOf("bindAccount") !== -1 || url.indexOf("getCode") !== -1) {
    callback({
      Accept: "application/json",
      "content-type": "application/json"
    });
  } else {
    try {
      getLocalItem("token").then(res => {
        if (callback)
          callback({
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: res.data
          });
      });
    } catch (e) {
      console.error("error", e);
    }
  }
}

const http = function(url, method, data, header) {
  console.error(url, method, data);
  method = method.toUpperCase() || "GET";
  return new Promise((resolve, reject) => {
    getAuthorzation(url, header => {
      Taro.request({
        url: baseUrl + url,
        data,
        method,
        header: header,
        success: res => {
          resolve(res.data);
        },
        fail: err => {
          console.log(err);
          Taro.showToast({
            title: "网络错误"
          });
          reject(err);
        }
      });
    });
  });
};
export default http;

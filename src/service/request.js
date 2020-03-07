import Taro from "@tarojs/taro";

const baseUrl = "http://localhost:8001";

const h = {
  Accept: "application/json",
  "content-type": "application/json",
  Authorization: Taro.getStorage("authorization")
};
const http = function(url, method, data, header) {
  console.log(url,method)
  header = header || h;
  method = method.toUpperCase() || "GET";
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + url,
      data,
      method,
      header: {
        "content-type": "application/json"
      },
      success: res => {
        console.log(res.data);
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
    // .then(res => {
    //   return res;
    // });
  });
};
export default http;

import Taro from "@tarojs/taro";

const { hideLoading, hideNavigationBarLoading } = Taro;

function queryToString(query) {
  let item = [];
  let keys = Object.keys(query);
  keys.forEach(key => {
    item.push(`${key}=${query[key]}`);
  });
  return item.join("&");
}

async function showError(e, opts) {
  console.error("showError", e);
  hideLoading();
  hideNavigationBarLoading();
  const { type = "toast", icon = "none", duration = 2000 } = opts;
  let { msg } = e.data;
  msg || (msg = e.message || "出错了");
  if (typeof e == "string") msg = e;
  if (type == "modal") {
    return Taro.showModal({
      content: msg,
      showCancel: false
    });
  } else {
    return Taro.showToast({
      title: msg,
      icon,
      duration
    });
  }
}

function reLaunch(url) {
  if (!url) {
    const { path, query } = Taro.getLaunchOptionsSync();
    url = `/${path}?${queryToString(query)}`;
  }
  Taro.reLaunch({ url });
}

async function showErrorModal(e, opts) {
  await showError(e, { type: "toast", ...opts });
}

async function showErrorAndRelaunch(e, url, opts) {
  showErrorModal(e);
  reLaunch(url);
}

function phoneisValid(phone) {
  if (typeof phone !== "string") return false;
  const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
  return reg.test(phone);
}

function setLocalItem(name, data) {
  Taro.setStorage({
    key: name,
    data
  });
}

function getLocalItem(name) {
  return new Promise((resolve, reject) => {
    Taro.getStorage({
      key: name,
      success: function(res) {
        resolve(res);
      }
    });
  });
}

// 防抖
function debounce(callback, duration = 1000) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      callback(...args); // 传递给func内部
    }, duration);
  };
}

function throttle(callback, duration) {
  let ready = true;
  return (...args) => {
    if (!ready) {
      return;
    }
    ready = false;
    callback(...args);
    setTimeout(() => {
      ready = true;
    }, duration);
  };
}

function getImageUrl(url, food) {
  if (Object.prototype.toString.call(url) !== "[object String]" || url == "") {
    return url;
  }
  const reg = /(jpeg|png|jpg|bmp|gif)$/;
  const s1 = url.substring(0, 1);
  const s2 = url.substring(1, 3);
  const s3 = url.substring(3, url.length);
  const s4 = reg.exec(url);
  return `${s1}/${s2}/${s3}.${s4[1]}`;
}

function formatDistance(distance) {
  if (typeof distance !== "number") return "";
  const d1 = distance / 1000;
  if (distance < 0) return `${d1}m`;
  else return `${d1.toFixed(2)}km`;
}

//加
function floatAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

//减
function floatSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

module.exports = {
  showErrorAndRelaunch,
  showError,
  queryToString,
  phoneisValid,
  setLocalItem,
  getLocalItem,
  debounce,
  throttle,
  getImageUrl,
  floatAdd,
  floatSub,
  formatDistance
};

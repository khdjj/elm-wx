import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import "@tarojs/async-await";
import { Provider } from "@tarojs/mobx";
import store from "@/store";
import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: ["pages/index/index", "pages/bindAccount/index"],
    subPackages: [
      {
        root: "pages/goods",
        pages: ["index"]
      },
      {
        root: "pages/home",
        pages: ["detail"]
      },
      {
        root: "pages/address",
        pages: ["city", "new", "select", "search", "selectOrderAddress"]
      },
      {
        root: "pages/order",
        pages: ["confirmOrder", "remark"]
      }
    ],
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于选择地理位置"
      }
    },
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    networkTimeout: {
      request: 8000,
      uploadFile: 20000
    },
    onReachBottomDistance: 50
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));

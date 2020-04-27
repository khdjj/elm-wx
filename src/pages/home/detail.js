import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtTabBar } from "taro-ui";
import DetailHeader from "./components/detailHeader";
import MenuDetail from "./components/menuDetail";
import Commend from "./components/commend";
import Message from "./components/message";
import "./detail.scss";

const tabList = [{ title: "点餐" }, { title: "评价" }, { title: "商家" }];

@inject("restaurantStore", "userStore")
@observer
export default class Index extends Component {
  @observable store = {
    current: 0,
    menu: [],
    rst: {},
  };

  async componentDidMount() {
    Taro.showLoading();
    try {
      const { restaurantStore: restStore } = this.props;
      const name = this.$router.params;
      const doc = await restStore.getRestaurantDetail(name);
      const { rst = {}, menus = [] } = doc.ret;
      restStore.currentRestraurant = rst;
      this.store.rst = rst;
      this.store.menu = menus;
      Taro.setNavigationBarTitle({
        title: rst.name || "",
      });
    } catch (err) {
    } finally {
      Taro.hideLoading();
    }
  }

  onSearch = () => {};

  handleTabClick = (current) => {
    this.store.current = current;
  };

  render() {
    const { current, menu = [], rst } = this.store;
    console.error(rst);
    return (
      <View className="page">
        <DetailHeader rst={rst} />
        <View className="page">
          {current === 0 && menu.length > 0 && <MenuDetail menu={menu} />}
          {current === 1 && <Commend restaurant={rst} />}
          {current === 2 && <Message restaurant={rst} />}
          <AtTabBar
            tabList={tabList}
            onClick={this.handleTabClick.bind(this)}
            current={current}
          />
        </View>
      </View>
    );
  }
}

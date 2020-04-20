import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtTabBar } from "taro-ui";
import DetailHeader from "./components/detailHeader";
import MenuDetail from "./components/menuDetail";
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
        title: rst.name || ""
      });
    } catch (err) {
    } finally {
      Taro.hideLoading();
    }
  }

  onSearch = () => {};

  handleTabClick = current => {
    this.store.current = current;
  };

  render() {
    const { current, menu = [], rst } = this.store;
    return (
      <View className="page">
        <DetailHeader rst={rst} />
        <View className="page">
          {current === 0 && menu.length > 0 && (
            <MenuDetail menu={menu} />
          )}
          {current === 1 && (
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              标签页二的内容
            </View>
          )}
          {current === 2 && (
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              标签页三的内容
            </View>
          )}
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

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtTabs, AtTabsPane } from "taro-ui";
import DetailHeader from "./components/detailHeader";
import DetailShop from "./components/detailShop";
import "./detail.scss";

const tabList = [{ title: "点餐" }, { title: "评价" }, { title: "商家" }];

@inject("restaurantStore", "userStore")
@observer
export default class Index extends Component {
  @observable store = {
    current: 0,
    menu: [],
    rst: {}
  };

  async componentDidMount() {
    const { restaurantStore: restStore, userStore } = this.props;
    const { latitude, longitude } = userStore;
    const doc = await restStore.getRestaurantDetail({
      latitude: latitude,
      longitude: longitude,
      extras: [
        "activities",
        "albums",
        "license",
        "identification",
        "qualification"
      ]
    });
    restStore.currentRestraurant = doc;
    const { rst = {}, menu = [] } = doc.ret;
    this.store.rst = rst;
    this.store.menu = menu;
    Taro.setNavigationBarTitle({
      title: rst.name || ""
    });
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
        <View>
          <AtTabs
            current={current}
            tabList={tabList}
            onClick={this.handleTabClick.bind(this)}
          >
            <AtTabsPane current={current} index={0}>
              {/* <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;"> */}
              {menu.map(items => (
                <DetailShop menus={items} />
              ))}
              {/* </View> */}
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                标签页二的内容
              </View>
            </AtTabsPane>
            <AtTabsPane current={current} index={2}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                标签页三的内容
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    );
  }
}

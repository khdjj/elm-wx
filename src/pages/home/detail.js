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

@inject("restaurantStore", "userStore", "commendStore", "shoppingCartStore")
@observer
export default class Index extends Component {
  @observable store = {
    current: 0,
    offset: 0,
    limit: 8,
    menu: [],
    rst: {},
    noMore: false,
    commendList: [],
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
    const { shoppingCartStore: sStore } = this.props;

    if (current === 1) {
      this.fetchComment();
    }
    if(current === 0){
      sStore.changeVisible(true)
    }else{
      sStore.changeVisible(false)
    }
  };

  fetchComment() {
    const { offset, limit, rst } = this.store;
    const { commendStore: cStore, restaurant } = this.props;
    cStore.getCommendList(rst._id).then((res) => {
      const comment = res.ret;
      this.store.commendList =
        offset === 0 ? comment : [...commendList].concat(comment);
      if (res.ret.length > 0) {
        this.store.offset = limit + offset;
      }
      console.error(res.ret.length);
      if (res.ret.length === 0) {
        this.store.noMore = true;
      }
    });
  }

  onReachBottom() {
    const { current } = this.store;
    if (current === 1) {
      this.fetchComment();
    }
  }

  render() {
    const { current, menu = [], rst, commendList, noMore } = this.store;
    return (
      <View className="page">
        <DetailHeader rst={rst} />
        <View className="page">
          {current === 0 && menu.length > 0 && <MenuDetail menu={menu} />}
          {current === 1 && (
            <Commend rst={rst} comment={commendList} noMore={noMore} />
          )}
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

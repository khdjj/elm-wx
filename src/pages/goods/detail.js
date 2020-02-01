import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtTabs, AtTabsPane } from "taro-ui";
import DetailHeader from "./components/detailHeader";
import DetailShop from "./components/detailShop";
import "./detail.scss";

const tabList = [{ title: "点餐" }, { title: "评价" }, { title: "商家" }];

@observer
export default class Index extends Component {
  @observable store = {
    current: 0
  };

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: "生煎先生"
    });
  }

  onSearch = () => {};

  handleTabClick = current => {
    console.error(current);
    this.store.current = current;
  };

  render() {
    const { current } = this.store;
    console.error("current", current);
    return (
      <View className="page">
        <DetailHeader />
        <View>
          <AtTabs
            current={current}
            tabList={tabList}
            onClick={this.handleTabClick.bind(this)}
          >
            <AtTabsPane current={current} index={0}>
              {/* <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;"> */}
              <DetailShop />
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

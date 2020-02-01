import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtCurtain, AtFloatLayout } from "taro-ui";

import "./detailHeader.scss";

@observer
export default class Index extends Component {
  @observable store = {
    curtainIsOpened: false,
    floatLayoutIsOpened: false
  };

  onSearch = () => {};

  handleOpenCurtain = () => {
    const { curtainIsOpened } = this.store;
    this.store.curtainIsOpened = !curtainIsOpened;
  };

  handleOpenFloatLayout = () => {
    const { floatLayoutIsOpened } = this.store;
    this.store.floatLayoutIsOpened = !floatLayoutIsOpened;
  };

  render() {
    const { curtainIsOpened, floatLayoutIsOpened } = this.store;
    return (
      <View>
        <View className="headerBanner">
          <View className="nav_image">
            <Image src="https://cube.elemecdn.com/a/d0/df0e61afae78bef400b9a18d496ecpng.png?x-oss-process=image/format,webp/resize,w_750" />
          </View>
          <View className="shop_detail">
            <View className="shop_logo">
              <Image src="https://cube.elemecdn.com/6/ff/98f57ac95e8a70efd1e68bb40896fpng.png?x-oss-process=image/format,webp/resize,w_150" />
            </View>
            {/* 店名及详情 */}
            <View className="shop_name">
              <Text className="name" onClick={this.handleOpenCurtain}>
                锦外火锅小馆*鸭血冒菜(兴盛路店)
              </Text>
              <View className="introduction">
                <Text>评价:4.5</Text>
                <Text>月售:3434单</Text>
                <Text>
                  商家配送:<Text>约62分钟</Text>
                </Text>
              </View>
            </View>
            {/* 红包 */}
            <View style="display:flex;flex-direction:row">
              <View className="welfare">
                <Text className="detail">
                  共<Text className="money">￥32</Text>
                  <Text className="get_money">领取</Text>
                </Text>
              </View>
              {/* 优惠 */}
              <View className="discount" onClick={this.handleOpenFloatLayout}>
                查看优惠
              </View>
            </View>
          </View>

          {/* 幕帘 */}
          <AtCurtain
            isOpened={curtainIsOpened}
            onClose={this.handleOpenCurtain}
          >
            <View className="curtain_content">
              <Text className="shop_name">Hi.Tea茶室(五羊店)</Text>
              <View className="detail">
                <View className="item">
                  <Text className="item_value">4.5</Text>
                  <Text className="item_label">评分</Text>
                </View>
                <View className="item">
                  <Text className="item_value">1332单</Text>
                  <Text className="item_label">月售</Text>
                </View>
                <View className="item">
                  <Text className="item_value">商家配送</Text>
                  <Text className="item_label">约32分钟</Text>
                </View>
                <View className="item">
                  <Text className="item_value">0元</Text>
                  <Text className="item_label">配送费</Text>
                </View>
                <View className="item">
                  <Text className="item_value">4.5km</Text>
                  <Text className="item_label">距离</Text>
                </View>
              </View>
              <View className="notice">
                <Text className="notice_title">公告</Text>
              </View>
              <Text className="notice_content">
                【%100动物奶油制作，保证新鲜美味】Cake遇见蛋糕店
                是一家全国大型连锁的蛋糕店 经过十多年的发展
                已经拥有完善的团队1-3小时全城上门，所有蛋糕都是当天新鲜现做，温馨提示：1.订单金额不足200可盖公章收据
                2.蛋糕赠送餐具蜡烛帽子。
              </Text>
            </View>
          </AtCurtain>

          <AtFloatLayout
            isOpened={floatLayoutIsOpened}
            title="优惠活动"
            onClose={this.handleOpenFloatLayout.bind(this)}
          >
            <View className="activity_sheet">
              <Text>
                满25元减1元，满35元减5元，满62元减12元，满120元减28元，满300元减70元
              </Text>
              <Text>超级会员领6元无门槛红包</Text>
            </View>
          </AtFloatLayout>
        </View>
      </View>
    );
  }
}

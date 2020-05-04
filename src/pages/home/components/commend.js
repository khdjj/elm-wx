import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtRate } from "taro-ui";
import userIcon from "@/images/timg.jpg";
import { getImageUrl, formatDate } from "@/service/utils";
import NoMore from "@/components/noMore";

import "./commend.scss";

@observer
@inject("commendStore")
export default class Comment extends Component {
  @observable store = {
    comment: [],
  };

  componentDidMount() {
    const { commendStore: cStore, restaurant } = this.props;
    cStore.getCommendList(restaurant._id).then((res) => {
      this.store.comment = res.ret;
    });
  }

  onReachBottom = () => {
    console.error("commend");
  };

  render() {
    const { comment = [] } = this.store;
    return (
      <View className="commentContent">
        <View className="business_rate">
          <Text className="rate_text">3.0</Text>
          <View className="rate_detail">
            <Text>商家评分</Text>
            <AtRate value={5.0} />
          </View>
        </View>
        {comment.length > 0 ? (
          comment.map((c) => (
            <View className="comment">
              <View className="comment_avatar">
                <Image src={userIcon} />
              </View>
              <View className="comment_detail">
                <View className="comment_user">
                  <Text>匿名用户</Text>
                  <Text>{formatDate(c.rated_at)}</Text>
                </View>
                <View className="comment_rate">
                  <AtRate size={14} value={c.rating} />
                </View>
                <View className="comment_text">{c.rating_text}</View>
                <View className="commentImages">
                  {c.raging_images.length > 0 &&
                    c.raging_images.map((image) => (
                      <Image src={getImageUrl(image)} className="images" />
                    ))}
                </View>
                {c.reply && <View className="reply">商家回复：{c.reply}</View>}
              </View>
            </View>
          ))
        ) : (
          <View>没有更多了</View>
        )}
      </View>
    );
  }
}

import Taro from "@tarojs/taro";
import { Button, Text, View } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer } from "@tarojs/mobx";
import { AtIcon, AtModal, AtModalAction, AtModalContent } from "taro-ui";

@observer
export default class Index extends Taro.PureComponent {
  @observable store = {
    authReminder: false
  };

  closeAuthReminder = () => {
    this.store.authReminder = false;
  };

  handleClick = async () => {
    const { needAuth = true, type } = this.props;
    let doc;
    if (needAuth) {
      try {
        if (type === "chooseLocation") {
          doc = await Taro.chooseLocation();
        } else if (type === "getLocation") {
          doc = await Taro.getLocation();
        }
      } catch (e) {
        const { errMsg } = e;
        if (errMsg && errMsg.includes("fail auth")) {
          this.store.authReminder = true;
          return;
        }
      }
    }
    this.props.onClick(doc);
  };

  render() {
    const { authReminder } = toJS(this.store);
    const { size, color } = this.props;

    return (
      <View style="position: relative;">
        <View>
          <AtIcon
            size={size || 18}
            value="map-pin"
            color={color || "white"}
            onClick={this.handleClick}
          />
        </View>

        <AtModal isOpened={authReminder}>
          <AtModalContent>
            <View
              className="auth-modal"
              style="font-size: 30rpx;text-align: center;"
            >
              <Text style="color: black;">
                需要打开位置服务才可获取地理位置信息
              </Text>
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeAuthReminder}>取消</Button>
            <Button openType="openSetting" onClick={this.closeAuthReminder}>
              去打开
            </Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}

Index.defaultProps = {
  needAuth: true,
  onClick: () => {}
};

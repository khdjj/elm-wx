import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.css'
import { showErrorAndRelaunch } from '@/service/utils'
const {
  showNavigationBarLoading,
  hideNavigationBarLoading
} = Taro

export default class Index extends Component {

  config = {
    navigationBarTitleText: ''
  }

  componentWillMount() { }

  async componentDidMount() {
    try {
      showNavigationBarLoading()
      let url = '/pages/goods/index'
      let doc = await Taro.getSetting()
      const isAuthed = doc.authSetting['scope.userInfo']
      console.error('isAuthed',isAuthed)
      if(!isAuthed){
        url = '/pages/bindAccount/index'
      }
      Taro.redirectTo({url:url})
    } catch (e) {
      return showErrorAndRelaunch(e)
    }finally{
      hideNavigationBarLoading()
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View />
    )
  }
}

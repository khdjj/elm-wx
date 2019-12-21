import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { observable, toJS } from 'mobx'
import { observer, inject } from '@tarojs/mobx'
import { AtButton, AtInput } from 'taro-ui'
import Banner from '@/components/banner'
import {phoneisValid} from '@/service/utils'
import './index.scss'


@observer
@inject('userStore')
export default class Index extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  @observable store = {
    mobile: '',
    code: '',
    time: 60,
    timer: null,
    getCodeValid: true,
    codeText: '获取验证码',
    get isValid() {
      return this.mobile && this.code
    }
  }

  onChange(key,e) {
    this.store[key] = e
  }

  onClickSubmit() {

  }

  getCode = ()=>{
    const {userStore:store} = this.props
    try{
      store.getCode()
    }catch(err){
      console.error(err)
    }
  }

  handleChangeStatus = ()=> {
    const store = this.store
    const {mobile} = store
    if(mobile == '' || !phoneisValid(mobile)){
      Taro.showModal({
        content: '请输入正确的手机号',
        showCancel: false
      })
      return
    }
    this.getCode()
    store.getCodeValid = false
    store.timer = setInterval(() => {
      store.codeText = '重新发送'+store.time
      store.time--
      if (store.time == 0) {
        clearInterval(store.timer)
        store.codeText = '获取验证码'
        store.getCodeValid = true
        store.time = 60
      }
    }, 1000)
  }

  render() {
    const { mobile, code, isValid, codeText, getCodeValid } = this.store
    return (
      <View>
        <Banner />
        <View className='content'>
          <View className='form'>
            <AtInput
              value={mobile}
              placeholder='请输入电话号码'
              type='text'
              onChange={this.onChange.bind(this, 'mobile')}
              clear />
            <AtInput
              value={code}
              placeholder='请输入验证码'
              type='text'
              onChange={this.onChange.bind(this, 'code')}
              clear>
              <AtButton
                onClick={this.handleChangeStatus}
                type='secondary'
                disabled={!getCodeValid}>{codeText}</AtButton>
            </AtInput>
            <AtButton
              onClick={this.onClickSubmit}
              disabled={!isValid}
              type='primary'
            >登录</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
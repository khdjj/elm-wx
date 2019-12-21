import Taro, { Component } from '@tarojs/taro'
import {View,Image} from '@tarojs/components'
import './banner.scss'

import bannerImage from '@/images/banner.jpg'

export default class Index extends Component{
  render(){
    return(
      <Image className='banner' src={bannerImage}/>
    )
  }
}
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observable, toJS } from "mobx";
import { observer, inject } from "@tarojs/mobx";
import { AtNavBar, AtSearchBar, AtIcon, AtButton } from "taro-ui";

import "./selectOrderAddress.scss";

@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: "选择地址"
  };


  handleAddAddress = ()=>{
      Taro.navigateTo({url:'/pages/address/new'})
  }

  render() {
    return (
      <View className="page">
        <View className="address">
          <View className="addresscard">
            <View className="addresscard_select">
              <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABVhJREFUWAm9mV1oXFUQgGfO3aQJBgMFIyRSkWQTf0p9SF4UrFRpEUk2rRAriqQPzaYNDVLbJx/MKogKLYqUkJ+C+lCxJDTJRqtthbZ5Emn1pRbsbixEkthSsdFg1mTvGWeuucvN2d27N+kmF8K558ycOV/mzpnzswhrfHYnorVpoFYkaiSAaiCsRi4JoQSA/kLA22z6OiBctQCHR8MDk2sZim0Gf/YkD1SldfoQA+0Bgq3BewJzwhUE9eUm/htq6JsO2jcQYNvtroqFucUjqPEoAVUENZ5TDyGlSH24ubT6g88eiaVy6ngaCwJGbnS+RGD3EsGDnn73/IqIk6Cge7xu8Bs/YyqfkIiwObG/R4M9XGw4GZPt15JNZ1sS+4/lY5D2nB5s++1weWph/nM20ubXuWgyhYNNdTUHYhjTps0sD4rnNhROiDR1XElMn4pRLGQCZjW0JDve5hm6MZ7z0HC6Sv8Mj3OCWPms8KBMCIbrWamy/jVEGGisf6h9CF+2zdEyMSipJHV3MbkeE8Ic1FtHVB+P1w8c9rZ53zMelDy38XDwnh+cgDoedFYI25685yTs/dcLvCvAt+INg++bavtuxsruLE2fVmWbDsa3nJhxPGhru3vD4JBXbVRv5IJ7/fej9/2xOH2Wk2SEUqkugXcANdBu8z9ZjzqvHprhovxZPzHtv5bovv/Pubnz7KgdIiPAfZLy0NmVaJ00OxS/jmkGbGe4L0zbvDBsTv3z9znOMU1eWciCppBsmbyN6/HOgb7In+qVsfqBEdO+xD/DXWC4baZM27hLyX7OFBSzzl5bQMtqHWsYzIKLTB2qXtLpS7nghIE/95OKhdWBgRDP8YBzQfV50zpvofVivK7/W7NPy2R0C6X+nWCKx0xZpo64VclOONPg88JgQ03hmmaLrF1BIHl1uAuKdo6G+y6ZZiXuKa0nZEdjyoz6A4rjoyCgwDWGa17l3UZ6tKHvh0KQ7Lk7iKHnxsMnvzcGhJab0UdtrSe4/WFTZtb561Zy7PL64fPwYBddOFfND5L1Z5VSz8bDfT+5+m4Z+fXgNliiy0HDiufHIscgzroGcpWE9NSPiVknN3nluSDZ01NolWwfC/df9+rKe2Sys0kvLV3kz1plyvLVhY1XHJrJp+C0E5TxrjrOO52dpp4XkmMuCRY+E6/rzcqprcmOp8nW33H/zaYN3zqzSQz6A4qFQpCKni8pVdvHawemzAEjyegO26bz7LlKU1aoLmx87uh4k3e0xwspO3I5kYEVidf3XwiiH0l2vkBan2G48iD6WToKj6gQ4FiWIF+DjyfNLnwYaiXbHlszHBsUNuWc+BGumQPkrQeAbE527iWNwzxbS/PaKSRgJmHjNONsCrOWId/+PpCRX6LtqO1THLhZ5x1fm4aQ489hcgBDKnRCliVDx7+aA7LlRrRTo/6UM6vl39lfKizCJFoM+v8jh3TQEHPrgcvliUNoP0EaPgrcz09RQeyr8Ml3RMXxoLyUV5Ye51x2S95X9bAnifTXxYITBmFxGTKAQ1W98whWF/vUd+lzO3pL3hbxlVsRHjkOMIOwuNYygNLA+e0MAzqudRU2tOSxHQbPoJkYdNs4b2EkET3N5YbeLsiOKR4e2Mvlii+4woMCKQpl5RXt0sGFXu9SxloecwWcw5NvcPHk8j1ND0dllqfz9VtVu8Q7f1a+I3zX9Jxrp+DA63eBCbdkQpgx54K5ZUFAUSzmFbAkYVJ0TFKJd7a6QGYZCNDtJEdEuYVwDvqrvETnT3mNBxuRFWKkrk9+AQj0rArQazHfzxCiw5E+IxthNj7DdwNXZVey1p8h/gM30j51BxSfeAAAAABJRU5ErkJggg==" />
            </View>
            <View className="addresscard_body">
              <View className="addresscard_title">
                <Text className="username">柳海杰</Text>
                <Text className="gender">(女士)</Text>
                <Text>15874496073</Text>
              </View>
              <View className="addresscard_address">
                <Text>广州图书馆东门</Text>
              </View>
            </View>
            <View className="addresscard_edit">
              <AtIcon
                value="edit"
                size="30"
                color="#333"
                className="atIcon"
              ></AtIcon>
              <AtIcon
                value="close"
                size="30"
                color="#333"
                className="atIcon"
              ></AtIcon>
            </View>
          </View>
        </View>
        <View className="addressview_bottom">
          <AtIcon
            value="add-circle"
            size="30"
            color="#3190e8"
            className="atIcon"
          ></AtIcon>
          <Text className="newAddress" onClick={this.handleAddAddress}>新增收货地址</Text>
        </View>
      </View>
    );
  }
}

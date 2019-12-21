import { observable } from 'mobx'
import elm from '@/service/request'
const store = observable({
  async getCode(){
    const doc = await elm.get('/user/getCode')
    return doc
  }
})

export default store
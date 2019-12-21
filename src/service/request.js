import Taro from '@tarojs/taro'

const baseUrl = 'http://localhost:8001'

const get  = function(url,data){
  return new Promise((resolve,reject)=>{
    Taro.request({
      url: baseUrl + url,
      data:data,
      method:'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
const post  = function(url,data){
  return new Promise((resolve,reject)=>{
    Taro.request({
      url: baseUrl + url,
      data:data,
      method:'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}

module.exports = {
  get,
  post
}

import Taro from '@tarojs/taro'

const {
  hideLoading,
  hideNavigationBarLoading
} = Taro

function queryToString(query) {
  let item = []
  let keys = Object.keys(query)
  keys.forEach((key) => {
    item.push(`${key}=${query[key]}`)
  })
  return item.join('&')
}

async function showError(e, opts) {
  console.error('showError',e)
  hideLoading()
  hideNavigationBarLoading()
  const { type = 'toast', icon = 'none', duration = 2000 } = opts
  let { msg } = e.data
  msg || (msg = e.message || '出错了')
  if (typeof (e) == 'string') msg = e
  if (type == 'modal') {
    return Taro.showModal({
      content: msg,
      showCancel: false
    })
  } else {
    return Taro.showToast({
      title: msg,
      icon,
      duration
    })
  }
}

function reLaunch(url) {
  if (!url) {
    const { path, query } = Taro.getLaunchOptionsSync()
    url = `/${path}?${queryToString(query)}`
  }
  Taro.reLaunch({ url })
}

async function showErrorModal(e, opts) {
  await showError(e, { type: 'toast', ...opts })
}

async function showErrorAndRelaunch(e, url, opts) {
  showErrorModal(e)
  reLaunch(url)
}


function phoneisValid(phone){
   if(typeof phone !== 'string') return false
   const reg = /^1[3|4|5|8][0-9]\d{4,8}$/
   return reg.test(phone)
}

module.exports = {
  showErrorAndRelaunch,
  showError,
  queryToString,
  phoneisValid
}
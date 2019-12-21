let config = {
  development: {
    log_level: 'debug',
    api: 'https://api.wyb.d.yilisafe.com',
    web: 'https://www.wyb.d.yilisafe.com',
    logapi: 'https://wyb.cn-shenzhen.log.aliyuncs.com/logstores/dev/track?APIVersion=0.6.0'
  },
  production: {
    log_level: 'warn',
    api: 'https://api.wyb.yilisafe.com',
    web: 'https://www.wyb.yilisafe.com',
    logapi: 'https://wyb.cn-shenzhen.log.aliyuncs.com/logstores/prod/track?APIVersion=0.6.0'
  }
}

const defaultConfig = {
  modules: {
    sso: {},
    passport: {},
    login: {}
  }
}

let env = process.env.NODE_ENV || 'development'
config = config[env] || config['development']
config.env = env
config = Object.assign({}, defaultConfig, config)

export default config

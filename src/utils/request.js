import axios from 'axios'
import common from '../utils/common'

let instance = axios.create();
// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d255246e345cc799822ae97/championnet_front'
  instance.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  instance.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  instance.defaults.baseURL = ''
}

// 设置超时时间
instance.defaults.timeout = 60000
// post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 允许携带cookie
instance.defaults.withCredentials = true

// 对外接口
export function request ({method, url, params}) {
  if (method === 'GET') {
    return get(url, params)
  } else if (method === 'POST') {
    return post(url, params)
  }
}

// 封装get方法
function get (url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, JSON.stringify(params)).then(res => {
      // 未登录状态访问页面时跳转到登录界面
      if (res.data.msg === "unlogged") {
        window.location.href = "/404?type=1"
      } else {
        if (url.indexOf("/api/login?") >= 0) {
          resolve(res.data)
        } else {
          if (url === "/api/regist" || url.indexOf("/api/statistics") >= 0 || url.indexOf("/api/recommend/getHotword") >= 0) {
            resolve(res.data)
          } else {
            if (sessionStorage.getItem("auth") === "") {
              window.location.href = "/404?type=1"
            } else {
              resolve(res.data)
            }
          }
        }
      }
    }).catch(err => {
      console.log(err)
      reject(err.data)
    })
  })
}

// 封装post方法
function post (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, JSON.stringify(params)).then(res => {
      if (res.data.msg === "unlogged") {
        window.location.href = "/404?type=1"
      } else {
        if (url.indexOf("/api/login?") >= 0) {
          resolve(res.data)
        } else {
          if (url === "/api/regist" || url.indexOf("/api/statistics") >= 0 || url.indexOf("/api/recommend/getHotword") >= 0) {
            resolve(res.data)
          } else {
            if (sessionStorage.getItem("auth") === "") {
              window.location.href = "/404?type=1"
            } else {
              resolve(res.data)
            }
          }
        }
      }
    }).catch(err => {
      console.log(err)
      reject(err.data)
    })
  })
}
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 如果是登陆请求
  config.headers.Authorization = 'Basic YW5kcm9pZDphbmRyb2lk'
  // 获取token
  let token = common.getLocalStorageAndTime('access_token')
  if (token) {
      config.headers.access_token = token
      // console.log('token为:' + token)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

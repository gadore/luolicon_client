import axios from 'axios'
import serverConfig from '../../serverConfig.json'
import lang from './languagePack'
import utils from './utils'

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data.code === 500) {
        // utils.notify('warning', lang('Server is Updating'), response.config.url || '')
      }
      if (response.data.code === 401) {
        utils.notify('warning', lang('Please Login'), response.config.url || '')
        localStorage.setItem('token', '')
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    utils.notify('error', lang(''), String(error))
    if (error === undefined || error.code === 'ECONNABORTED') {
      return Promise.reject(error)
    }
    const { response } = error
    return response
  }
)

export default {
  get: (url: string, args: Object) => {
    return axios({
      method: 'get',
      url: url,
      params: args,
      baseURL: serverConfig.serverHost,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      timeout: serverConfig.requestTimeOut
    })
  },
  post: (url: string, args: Object) => {
    return axios({
      method: 'post',
      baseURL: serverConfig.serverHost,
      url: url,
      data: JSON.stringify(args),
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: serverConfig.requestTimeOut
    })
  },
  postWithParams: (url: string, args: Object) => {
    return axios({
      method: 'post',
      baseURL: serverConfig.serverHost,
      url: url,
      params: args,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      timeout: serverConfig.requestTimeOut
    })
  }
}

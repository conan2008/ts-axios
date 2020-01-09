import Axios from './core/Axios'
import { extend } from './helpers/utils'
import { AxiosRequestConfig, AxiosStatic } from './types'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  /**
   * instance是一个函数
   * 这样做返回的 instance 不仅仅拥有 Axios 类实例的所有方法本身也可以作为一个函数被调用。
   * 既可以使用 axios.get(url,options)、axios.post(url,options)还可以axios(options) 或者 axios(url, options)
   */
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function (config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
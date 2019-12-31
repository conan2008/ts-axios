import Axios from './core/Axios'
import { extend } from './helpers/utils'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  const context = new Axios()
  /**
   * instance是一个函数
   * 这样做返回的 instance 不仅仅拥有 Axios 类实例的所有方法本身也可以作为一个函数被调用。
   * 既可以使用 axios.get(url,options)、axios.post(url,options)还可以axios(options) 或者 axios(url, options)
   */
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformResponseDataHandle } from '../helpers/data'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function axios(config: AxiosRequestConfig): AxiosPromise<AxiosRequestConfig> {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(response => {
    return transformResponseData(response)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse): any {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return transformResponseDataHandle(res)
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

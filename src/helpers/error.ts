import { AxiosRequestConfig, AxiosResponse } from "../types"

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  resopnse?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    resopnse?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.resopnse = resopnse
    this.isAxiosError = true

    // hack， 当ts继承一些内置对象 比如map array error
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  resopnse?: AxiosResponse
) {
  return new AxiosError(message, config, code, request, resopnse)
}
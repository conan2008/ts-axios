import { isPlainObject } from './utils'

export function transformRequestDataHandle(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export function transformResponseDataHandle(res: any): any {
  if (typeof res.data === 'string') {
    try {
      res.data = JSON.parse(res.data)
    } catch {
      // do nothing
    }
  }

  return res
}
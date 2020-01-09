import { isPlainObject } from './utils'

export function transformRequestDataHandle(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export function transformResponseDataHandle(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch {
      // do nothing
    }
  }

  return data
}
import { isDate, isPlainObject } from './utils'

/**
 * 保留特殊字符
 * @param val 
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function buildURL(url: string, params?: any): string {

  if (!params) {
    return url
  }

  const parts: string[] = []
  let serializedParams

  Object.keys(params).forEach(key => {
    let val = params[key]

    if (val === null) {
      return
    }

    let values: string[] = []
    // isArray
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(item => {
      // isDate or isObject
      if (isDate(item)) {
        val = item.toISOString()
      } else if (isPlainObject(item)) {
        val = JSON.stringify(item)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + serializedParams
  }
  return url
}
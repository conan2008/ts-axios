import { isPlainObject, deepMerge } from './utils'
import { Method } from '../types'

function normalizeName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers.name
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // Content-Type 如果写的不规范
  normalizeName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;chartset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)

  if (!headers) {
    return
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {

  if (!headers) {
    return
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['get', 'post', 'delete', 'head', 'options', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
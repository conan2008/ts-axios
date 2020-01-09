import { CancelExecutor, CancelTokenSource, Canceler } from "../types"
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    // padding状态的promise 因为没有执行resolve
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    // 外部调用， 执行了上面的promise， 到了xhr内部的cancelToken的reject 返回message
    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason as Cancel)
    })
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
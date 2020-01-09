import { ResolvedFn, RejectedFn, AxiosInterceptorManager } from "../types";

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> implements AxiosInterceptorManager<T>{
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    return this.interceptors.length - 1
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  // interceptors是private 类似访问器方法
  // 也是为了遍历拦截器，提供外部方法
  // foreach没有定义在接口， 是因为内部实现，不想提供给外部使用
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceprtor => {
      if (interceprtor !== null) {
        fn(interceprtor)
      }
    })
  }
}
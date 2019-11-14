import { ActionMeta, StaticSendOptions } from '../lib/action-meta'
import { getMeta } from '../lib/utils'
import { HttpMethods } from '../types'

export function get(route?: string | RegExp): MethodDecorator {
  return (root: object, method: string) => {
    getMeta(root).actions.push(
      new ActionMeta({
        httpMethod: HttpMethods.get,
        method,
        route
      })
    )
  }
}

export function post(route?: string | RegExp): MethodDecorator {
  return (root: object, method: string) => {
    getMeta(root).actions.push(
      new ActionMeta({
        httpMethod: HttpMethods.post,
        method,
        route
      })
    )
  }
}

export function put(route?: string | RegExp): MethodDecorator {
  return (root: object, method: string) => {
    getMeta(root).actions.push(
      new ActionMeta({
        httpMethod: HttpMethods.put,
        method,
        route
      })
    )
  }
}

export function del(route?: string | RegExp): MethodDecorator {
  return (root: object, method: string) => {
    getMeta(root).actions.push(
      new ActionMeta({
        httpMethod: HttpMethods.del,
        method,
        route
      })
    )
  }
}

/**
 * Make the method as static file server (using `koa-send`).
 * The method body should be empty. Since it will be ignored.
 */
export function serve(
  route?: string | RegExp,
  options?: StaticSendOptions
): MethodDecorator {
  return (root: object, method: string) => {
    getMeta(root).actions.push(
      new ActionMeta({
        httpMethod: HttpMethods.get,
        method,
        route,
        static: true,
        staticOptions: options
      })
    )
  }
}

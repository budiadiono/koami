import { ActionMeta } from '../lib/action-meta'
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

import { getMeta } from '../lib/utils'

export function controller(route?: string | RegExp): ClassDecorator {
  return (target: Function) => {
    getMeta(target.prototype).setTarget(target as FunctionConstructor, route)
  }
}

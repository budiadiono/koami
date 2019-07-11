import { RouterContext } from 'koa-router'
import { IParamMeta } from '../types'

export class ParamMeta implements IParamMeta {
  /**
   * name of method
   */
  method: string

  /**
   * parameter name
   */
  name: string

  /**
   * parameter index
   */
  index: number

  constructor(key: string, index: number, name: string) {
    this.method = key
    this.index = index
    this.name = name
  }

  getValue(context: RouterContext) {
    return context.params[this.name]
  }
}

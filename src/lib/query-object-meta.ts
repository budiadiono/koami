import { RouterContext } from 'koa-router'
import { IParamMeta } from '../types'

export class QueryObjectMeta implements IParamMeta {
  /**
   * name of method
   */
  method: string

  /**
   * parameter index
   */
  index: number

  constructor(key: string, index: number) {
    this.method = key
    this.index = index
  }

  getValue(context: RouterContext) {
    return context.query
  }
}

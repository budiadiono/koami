import { RouterContext } from 'koa-router'
import { IParamMeta } from '../types'

export class QueryObjectMeta<T = any> implements IParamMeta {
  /**
   * name of method
   */
  method: string

  /**
   * parameter index
   */
  index: number

  /**
   * resolver callback
   */
  resolver?: (obj: any) => T

  constructor(key: string, index: number, resolver?: (obj: any) => T) {
    this.method = key
    this.index = index
    this.resolver = resolver
  }

  getValue(context: RouterContext) {
    if (this.resolver) {
      return this.resolver(context.query)
    }
    return context.query
  }
}

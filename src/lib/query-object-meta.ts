import { RouterContext } from 'koa-router'
import { IParamMeta, IParamValidationMeta, ValidateType } from '../types'
import { validateValue } from './utils'

export class QueryObjectMeta<T = any>
  implements IParamMeta, IParamValidationMeta {
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

  /**
   * validation function/schema
   */
  validate?: ValidateType

  constructor(
    key: string,
    index: number,
    resolver?: (obj: any) => T,
    validate?: ValidateType
  ) {
    this.method = key
    this.index = index
    this.resolver = resolver
    this.validate = validate
  }

  getValue(context: RouterContext) {
    if (this.resolver) {
      return validateValue(this.resolver(context.query), this.validate)
    }
    return validateValue(context.query, this.validate)
  }
}

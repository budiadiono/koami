import 'koa-body'
import { RouterContext } from 'koa-router'
import { IParamMeta, IParamValidationMeta, ValidateType } from '../types'
import { validateValue } from './utils'
export class BodyMeta implements IParamMeta, IParamValidationMeta {
  /**
   * name of method
   */
  method: string

  /**
   * parameter index
   */
  index: number

  /**
   * validation function/schema
   */
  validate?: ValidateType

  constructor(key: string, index: number, validate?: ValidateType) {
    this.method = key
    this.index = index
    this.validate = validate
  }

  getValue(context: RouterContext) {
    let data = context.request.body
    if (context.request.files) {
      data = { ...data, ...context.request.files }
    }
    return validateValue(data, this.validate)
  }
}

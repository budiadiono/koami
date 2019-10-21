import { RouterContext } from 'koa-router'
import { IParamMeta, IParamValidationMeta, ValidateType } from '../types'
import { validateValue } from './utils'

export class ParamMeta implements IParamMeta, IParamValidationMeta {
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

  /**
   * validation function/schema
   */
  validate?: ValidateType

  constructor(
    key: string,
    index: number,
    name: string,
    validate?: ValidateType
  ) {
    this.method = key
    this.index = index
    this.name = name
    this.validate = validate
  }

  getValue(context: RouterContext) {
    return validateValue(context.params[this.name], this.validate)
  }
}

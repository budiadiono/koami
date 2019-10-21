import { RouterContext } from 'koa-router'
import { Schema } from 'yup'
import { RouterConfig } from '..'

export enum HttpMethods {
  get = 'get',
  post = 'post',
  put = 'put',
  del = 'del',
  all = 'all',
  head = 'head'
}

export interface IParamMeta {
  index: number
  getValue: (context: RouterContext, config: RouterConfig) => any
}

export interface IParamValidationMeta {
  validate?: ValidateType
}

export type ValidateType = Schema<any> | Function

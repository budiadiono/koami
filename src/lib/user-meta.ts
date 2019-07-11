import Boom from '@hapi/boom'
import { RouterContext } from 'koa-router'
import { RouterConfig } from '../..'
import { IParamMeta } from '../types'

export class UserMeta implements IParamMeta {
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

  getValue(context: RouterContext, config: RouterConfig) {
    const user = context.state[config.userStateName || 'user']
    if (!user) {
      throw Boom.unauthorized()
    }

    return user
  }
}

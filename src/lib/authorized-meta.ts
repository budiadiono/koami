import Boom from '@hapi/boom'
import { RouterContext } from 'koa-router'
import { RouterConfig } from '../..'

export class AuthorizedMeta {
  roles: string[]
  authorize?: (user: any) => string
  method: string
  errorMsg: string

  constructor(
    method: string,
    roles: string[],
    errorMsg: string,
    authorize?: (user: any) => string
  ) {
    this.method = method
    this.roles = roles
    this.authorize = authorize
    this.errorMsg = errorMsg
  }

  validate(context: RouterContext, config: RouterConfig) {
    const { userStateName, getUserRoles } = config
    const user = context.state[userStateName || 'user']
    if (!user) {
      throw Boom.unauthorized()
    }

    if (this.roles.length) {
      if (!getUserRoles) {
        throw new Boom(`The 'getUserRoles' method is not implemented.`)
      }

      const userRoles = getUserRoles(user) || []
      if (!userRoles.some(role => this.roles.indexOf(role) > -1)) {
        throw Boom.unauthorized(this.errorMsg)
      }
    }

    if (this.authorize) {
      const result = this.authorize(user)
      if (typeof result === 'string') {
        throw Boom.unauthorized(result)
      }
    }
  }
}

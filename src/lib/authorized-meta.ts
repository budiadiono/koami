import Boom from '@hapi/boom'
import { RouterContext } from 'koa-router'
import { RouterConfig } from '../..'

export class AuthorizedMeta {
  roles: string[]

  method: string

  constructor(method: string, roles: string[]) {
    this.method = method
    this.roles = roles
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
        throw Boom.unauthorized('Insufficient access right.')
      }
    }
  }
}

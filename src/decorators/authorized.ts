// tslint:disable: unified-signatures
import { AuthorizedMeta } from '../lib/authorized-meta'
import { getMeta } from '../lib/utils'

export function authorized(): Function
export function authorized(role: string): Function
export function authorized(roles: string[]): Function
export function authorized(roleOrRoles?: string | string[]) {
  let roles: string[] = []
  if (!roleOrRoles) {
    roles = []
  } else if (Array.isArray(roleOrRoles)) {
    roles = roleOrRoles
  } else {
    roles.push(roleOrRoles as string)
  }

  return (target: object | any, key: string) => {
    if (target.prototype) {
      getMeta(target.prototype).controllerAuthorizations.push(
        new AuthorizedMeta(key, roles || [])
      )
    } else {
      getMeta(target).methodAuthorizations.push(
        new AuthorizedMeta(key, roles || [])
      )
    }
  }
}

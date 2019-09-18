// tslint:disable: unified-signatures
import { AuthorizedMeta } from '../lib/authorized-meta'
import { getMeta } from '../lib/utils'

export function authorized(): Function
export function authorized(role: string, errroMsg?: string): Function
export function authorized(role: any, errroMsg?: string): Function
export function authorized(roles: string[], errroMsg?: string): Function
export function authorized(
  fn: (user: any) => string,
  errroMsg?: string
): Function
export function authorized(
  roleOrRoles?: string | string[] | ((user: any) => string),
  errroMsg: string = 'Insufficient access right.'
) {
  let roles: string[] = []
  let fn: any

  if (!roleOrRoles) {
    roles = []
  } else if (Array.isArray(roleOrRoles)) {
    roles = roleOrRoles
  } else if (typeof roleOrRoles === 'function') {
    fn = roleOrRoles
  } else {
    roles.push(roleOrRoles as string)
  }

  return (target: object | any, key: string) => {
    if (target.prototype) {
      getMeta(target.prototype).controllerAuthorizations.push(
        new AuthorizedMeta(key, roles || [], errroMsg, fn)
      )
    } else {
      getMeta(target).methodAuthorizations.push(
        new AuthorizedMeta(key, roles || [], errroMsg, fn)
      )
    }
  }
}

import { RouterContext } from 'koa-router'

export class ControllerBase<TUser = any> {
  context: RouterContext
  next: () => Promise<any>
  user: TUser
}

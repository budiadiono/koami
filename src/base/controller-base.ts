import { RouterContext } from 'koa-router'

export class ControllerBase {
  context: RouterContext
  next: () => Promise<any>
}

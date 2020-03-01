import compose from 'koa-compose'
import Router, { IMiddleware, RouterContext } from 'koa-router'
import { getMeta } from './src/lib/utils'

export * from './src/base/controller-base'
export * from './src/decorators/actions'
export * from './src/decorators/authorized'
export * from './src/decorators/body'
export * from './src/decorators/controller'
export * from './src/decorators/param'
export * from './src/decorators/query-object'
export * from './src/decorators/user'

export function routing(
  config: RouterConfig,
  ...controllers: Function[]
): IMiddleware
export function routing(...controllers: Function[]): IMiddleware
export function routing(args: any, ...controllers: Function[]): IMiddleware {
  let config: RouterConfig = {}

  if (typeof args === 'function') {
    controllers = [args, ...controllers]
  } else {
    config = args
  }

  let { base } = config

  if (!base || base === '/') {
    base = ''
  } else if (!base.startsWith('/')) {
    base = '/' + base
  }

  config.base = base

  const router = new Router()

  if (config.init) {
    config.init(router)
  }

  return compose([
    router
      .use(
        base,
        ...controllers
          .filter(c => typeof c === 'function')
          .map(ctrl => getMeta(ctrl.prototype).routes(ctrl, config))
      )
      .routes(),
    router.allowedMethods()
  ])
}

export interface RouterConfig {
  /**
   * Base url. Default is '/'
   */
  base?: string

  /**
   * State name of user. Default is 'user'
   */
  userStateName?: string

  /**
   * Ioc Container
   */
  container?: IocContainer

  /**
   * Init callback. Called once Router instance initialized.
   */
  init?: (router: Router) => void

  /**
   * Get user role callback from user state
   */
  getUserRoles?: (user: any) => any[]

  /**
   * Error handler callback
   */
  onError?: (error: any, context: RouterContext) => void
}

export interface IocContainer {
  get(identifier: any): any
  resolve(identifier: any): any
}

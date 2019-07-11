import compose from 'koa-compose'
import Router, { IMiddleware, RouterContext } from 'koa-router'
import _ from 'lodash'
import { RouterConfig } from '../..'
import { ActionMeta } from './action-meta'
import { AuthorizedMeta } from './authorized-meta'
import { BodyMeta } from './body-meta'
import { ParamMeta } from './param-meta'
import { UserMeta } from './user-meta'

export class ControllerMeta {
  private target: FunctionConstructor
  private route: string | RegExp

  /**
   * Controller actions
   */
  actions: ActionMeta[] = []

  /**
   * Body parameters
   */
  bodyParameters: BodyMeta[] = []

  /**
   * Query string parameters
   */
  urlParameters: ParamMeta[] = []

  /**
   * User parameters
   */
  userParameters: UserMeta[] = []

  /**
   * Controller authorization
   */
  controllerAuthorizations: AuthorizedMeta[] = []

  /**
   * Method authorization
   */
  methodAuthorizations: AuthorizedMeta[] = []

  /**
   * Set controller target
   * @param target controller class
   * @param route base route
   */
  setTarget(target: FunctionConstructor, route?: string | RegExp) {
    this.target = target

    if (!route) {
      // build route from controller class name
      // and remove constructor suffix
      route = _.kebabCase(target.name).replace(/-controller$/, '')
    }

    // ensure route started with '/'
    if (!route.toString().startsWith('/')) {
      route = '/' + route
    }

    this.route = route
  }

  /**
   * Build routes middleware for this controller
   */
  routes(config: RouterConfig): IMiddleware {
    const router = new Router()
    const clazz = new this.target()

    for (const a of this.actions) {
      router[a.httpMethod](
        a.route,
        compose<RouterContext>([a.createMiddleware(this, clazz, config)])
      )
    }

    return new Router().use(this.route, router.routes()).routes()
  }
}

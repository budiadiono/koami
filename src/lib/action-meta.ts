import { IMiddleware } from 'koa-router'
import _ from 'lodash'
import { RouterConfig } from '../..'
import { HttpMethods, IParamMeta } from '../types'
import { ControllerMeta } from './controller-meta'

export class ActionMeta {
  httpMethod: HttpMethods
  method: string
  route: string | RegExp

  constructor(args: ActionMetaArgs) {
    this.httpMethod = args.httpMethod
    this.method = args.method

    let { route } = args

    if (!route) {
      // build route name from method name
      route = _.kebabCase(args.method)
    } else if (route.toString().startsWith(':')) {
      route = '/' + _.kebabCase(args.method) + '/' + route
    }

    if (route === 'index') {
      // treat index method name as default route
      route = '/'
    } else if (!route.toString().startsWith('/')) {
      // ensure route started with '/'
      route = '/' + route
    }

    this.route = route
  }

  createMiddleware(
    meta: ControllerMeta,
    clazz: Function,
    config: RouterConfig
  ): IMiddleware {
    return async (context, next) => {
      Object.assign(clazz, {
        context,
        next,
        user: context.state[config.userStateName || 'user']
      })

      // build method params
      const params: IParamMeta[] = _([
        ...meta.bodyParameters.filter(b => b.method === this.method),
        ...meta.urlParameters.filter(b => b.method === this.method),
        ...meta.queryObjectParameters.filter(b => b.method === this.method),
        ...meta.userParameters.filter(b => b.method === this.method)
      ])
        .sortBy(p => p.index)
        .value()

      try {
        // exec controller authorization
        for (const baseAuth of meta.controllerAuthorizations) {
          baseAuth.validate(context, config)
        }

        // exec method authorization
        for (const authMeta of meta.methodAuthorizations.filter(
          b => b.method === this.method
        )) {
          authMeta.validate(context, config)
        }

        context.body = await clazz[this.method].apply(
          clazz,
          params.map(p => p.getValue(context, config))
        )

        await next()
      } catch (error) {
        const { onError } = config

        if (onError) {
          await onError(error, context)
        } else {
          context.status = error.status || 500
          context.body = 'Oops! Something went wrong :('
          context.app.emit('error', error, context)
        }
      }
    }
  }
}

export interface ActionMetaArgs {
  httpMethod: HttpMethods
  method: string
  route?: string | RegExp
}

import { ParamMeta } from '../lib/param-meta'
import { getMeta } from '../lib/utils'

export function param(name: string): ParameterDecorator {
  return (target: object, key: string, index: number) => {
    getMeta(target).bodyParameters.push(new ParamMeta(key, index, name))
  }
}

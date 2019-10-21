import { ParamMeta } from '../lib/param-meta'
import { getMeta } from '../lib/utils'
import { ValidateType } from '../types'

export function param(
  name: string,
  validate?: ValidateType
): ParameterDecorator {
  return (target: object, key: string, index: number) => {
    getMeta(target).bodyParameters.push(
      new ParamMeta(key, index, name, validate)
    )
  }
}

import { BodyMeta } from '../lib/body-meta'
import { getMeta } from '../lib/utils'
import { ValidateType } from '../types'

export function body(validate?: ValidateType): ParameterDecorator {
  return (target: object, key: string, index: number) => {
    getMeta(target).bodyParameters.push(new BodyMeta(key, index, validate))
  }
}

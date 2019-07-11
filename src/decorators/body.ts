import { BodyMeta } from '../lib/body-meta'
import { getMeta } from '../lib/utils'

export function body(): ParameterDecorator {
  return (target: object, key: string, index: number) => {
    getMeta(target).bodyParameters.push(new BodyMeta(key, index))
  }
}

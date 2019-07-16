import { QueryObjectMeta } from '../lib/query-object-meta'
import { getMeta } from '../lib/utils'

export function queryObject(): ParameterDecorator {
  return (target: object, key: string, index: number) => {
    getMeta(target).queryObjectParameters.push(
      new QueryObjectMeta(key, index)
    )
  }
}

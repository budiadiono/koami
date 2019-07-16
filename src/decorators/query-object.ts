import { QueryObjectMeta } from '../lib/query-object-meta'
import { getMeta } from '../lib/utils'

export function queryObject<T>(resolver?: (obj: any) => T): ParameterDecorator {
  return (target: object, key: string, index: number) => {
    getMeta(target).queryObjectParameters.push(
      new QueryObjectMeta(key, index, resolver)
    )
  }
}

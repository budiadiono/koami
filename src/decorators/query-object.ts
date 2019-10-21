import { QueryObjectMeta } from '../lib/query-object-meta'
import { getMeta } from '../lib/utils'
import { ValidateType } from '../types'

export function queryObject<T>(
  resolver?: (obj: any) => T,
  validate?: ValidateType
): ParameterDecorator {
  return (target: object, key: string, index: number) => {
    getMeta(target).queryObjectParameters.push(
      new QueryObjectMeta(key, index, resolver, validate)
    )
  }
}

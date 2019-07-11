import { UserMeta } from '../lib/user-meta'
import { getMeta } from '../lib/utils'

/**
 * Get current authorized user
 */
export function user(): ParameterDecorator {
  return (target: object, key: string, index: number) => {
    getMeta(target).userParameters.push(new UserMeta(key, index))
  }
}

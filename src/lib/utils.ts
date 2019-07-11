import { ControllerMeta } from './controller-meta'

export function getMeta(object: any): ControllerMeta {
  if (!object.controller) {
    object.controller = new ControllerMeta()
  }
  return object.controller
}

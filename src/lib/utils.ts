import Boom from '@hapi/boom'
import { ValidationError } from 'yup'
import { ValidateType } from '../types'
import { ControllerMeta } from './controller-meta'

export function getMeta(object: any): ControllerMeta {
  if (!object.controller) {
    object.controller = new ControllerMeta()
  }
  return object.controller
}

export function validateValue(value: any, validate?: ValidateType) {
  if (validate) {
    if (typeof validate === 'function') {
      return validate(value)
    } else {
      try {
        return validate.validateSync(value)
      } catch (error) {
        if (error instanceof ValidationError) {
          throw Boom.badRequest(error.message)
        }
      }
    }
  }
  return value
}

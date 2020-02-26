import Boom from '@hapi/boom'
import * as yup from 'yup'
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
      validate = yup.object(validate(yup))
    }

    try {
      return validate.validateSync(value, {
        abortEarly: false
      })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const e = Boom.badRequest(error.message)

        e.output.statusCode = 400

        // tslint:disable-next-line: no-string-literal
        e.output.payload['validationErrors'] = error.inner.map(err => ({
          path: err.path,
          message: err.errors.join(', ')
        }))

        e.reformat()

        throw e
      }
    }
  }
  return value
}

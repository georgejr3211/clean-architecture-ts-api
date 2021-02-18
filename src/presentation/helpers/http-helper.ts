import { InternalServerError } from '../errors'
import { HttpResponse } from '../protocols/http'

export function badRequest (error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function internalServerError (): HttpResponse {
  return {
    statusCode: 500,
    body: new InternalServerError()
  }
}

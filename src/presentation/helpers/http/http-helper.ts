import { UnauthorizedError, InternalServerError } from '../../errors'
import { HttpResponse } from '../../protocols'

export function badRequest (error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function unauthorized (): HttpResponse {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export function forbidden (error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: error
  }
}

export function internalServerError (error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: new InternalServerError(error.stack)
  }
}

export function ok (data: any): HttpResponse {
  return {
    statusCode: 200,
    body: data
  }
}

export function noContent (): HttpResponse {
  return {
    statusCode: 204,
    body: null
  }
}

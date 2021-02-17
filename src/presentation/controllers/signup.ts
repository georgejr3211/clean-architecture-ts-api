import { MissingParamError } from '../errors/missing-params'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: null
    }

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        httpResponse.statusCode = 400
        httpResponse.body = new MissingParamError(field)
        return httpResponse
      }
    }

    return httpResponse
  }
}

import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, internalServerError } from '../helpers/http-helper'
import { EmailValidator, AddAccount, Controller, HttpResponse, HttpRequest } from './signup-protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: null
      }

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({ name, email, password })

      return httpResponse
    } catch (error) {
      return internalServerError()
    }
  }
}

import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../protocols/email-validator'
import { Validation } from '../../presentation/protocols/validation'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidatior: EmailValidator) {}

  validate (input: any): Error | null {
    const isValid = this.emailValidatior.isValid(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
    return null
  }
}

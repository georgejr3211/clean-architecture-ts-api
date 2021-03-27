import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidator } from '../../../../validation/protocols/email-validator'
import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '../../../../validation/validators'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../../validation/validators/validation-composite.ts')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()

  return emailValidatorStub
}

describe('Login Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = [];
    ['email', 'password'].forEach(field => validations.push(new RequiredFieldValidation(field)))

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

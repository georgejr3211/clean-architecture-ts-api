import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../adapters/validation/email-validator'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const validations: Validation[] = [];
  ['email', 'password'].forEach(field => validations.push(new RequiredFieldValidation(field)))

  validations.push(new EmailValidation('email', emailValidatorAdapter))

  return new ValidationComposite(validations)
}

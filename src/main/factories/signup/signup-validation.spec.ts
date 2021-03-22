import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from "../../../presentation/helpers/validators";
import { EmailValidator } from "../../../presentation/protocols/email-validator";
import { Validation } from "../../../presentation/protocols/validation";
import { makeSignUpValidation } from "./signup-validation";

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        return true
      }
    }
  
    const emailValidatorStub = new EmailValidatorStub()
  
    return emailValidatorStub
  }

describe('SignUp Validation Factory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeSignUpValidation()
        const validations: Validation[] = [];
        ['name', 'email', 'password', 'passwordConfirmation'].forEach(field => validations.push(new RequiredFieldValidation(field)))

        validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', makeEmailValidator()))
        
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    });
});
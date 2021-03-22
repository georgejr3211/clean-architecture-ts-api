import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidatorAdapter } from "../../adapters/validation/email-validator";

export const makeSignUpValidation = (): ValidationComposite => {
    const emailValidatorAdapter = new EmailValidatorAdapter();
    const validations: Validation[] = [];
    ['name', 'email', 'password', 'passwordConfirmation'].forEach(field => validations.push(new RequiredFieldValidation(field)));

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', emailValidatorAdapter));

    return new ValidationComposite(validations);
};
import { MissingParamError } from "../../errors";
import { Validation } from "../../protocols/validation";
import { ValidationComposite } from "./validation-composite";

const makeValidatorStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }

  const validationStub = new ValidationStub();

  return validationStub
};

interface SutTypes {
  sut: ValidationComposite,
  validatorStubs: Validation[];
}

const makeSut = (): SutTypes => {
  const validatorStubs = [makeValidatorStub(), makeValidatorStub()];
  const validations: Validation[] = validatorStubs;
  const sut = new ValidationComposite(validations);
  return {
    sut,
    validatorStubs
  };
};

describe('Validation Composite', () => {
  test('Should throw an Error if any validate fails', () => {
    const { sut, validatorStubs } = makeSut();
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ wrongField: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should return the first error if more then one validator fails', () => {
    const { sut, validatorStubs } = makeSut();
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ wrongField: 'any_value' });
    expect(error).toEqual(new Error());
  });

  test('Should not return if validate succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeFalsy();
  });
});
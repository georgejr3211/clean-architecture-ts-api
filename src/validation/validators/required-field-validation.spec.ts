import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('Required Field Validation', () => {
  test('Should throw MissingParamError if validate fails', () => {
    const sut = makeSut()
    const error = sut.validate({ wrongField: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validate succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})

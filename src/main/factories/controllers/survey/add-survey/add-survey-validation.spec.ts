import { Validation } from '@/presentation/protocols';
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

import { makeAddSurveyValidation } from './add-survey-validation';

jest.mock('@/validation/validators/validation-composite.ts')

describe('Add Survey Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = [];
    ['question', 'answers'].forEach(field => validations.push(new RequiredFieldValidation(field)))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

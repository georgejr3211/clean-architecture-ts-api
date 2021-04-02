import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/account/load-account-by-token/db-add-account.factory'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}

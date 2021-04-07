import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { Authentication } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbAuthentication = (): Authentication => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const loadAccountByEmailRepository = new AccountMongoRepository()
  return new DbAuthentication(loadAccountByEmailRepository, bcryptAdapter, jwtAdapter, loadAccountByEmailRepository)
}

import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account';
import { AddAccount } from '@/domain/usecases';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const loadAccountByEmailRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, addAccountRepository, loadAccountByEmailRepository)
}

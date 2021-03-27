import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../authentication/db-authentication-protocols'
import { AddAccount, Hasher, AddAccountModel, AccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (account) return null

    const hashedPassword = await this.hasher.hash(accountData.password)
    const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return newAccount
  }
}

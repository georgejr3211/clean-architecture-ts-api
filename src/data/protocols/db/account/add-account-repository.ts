import { AccountModel } from '@/domain/entities/account'
import { AddAccountModel } from '@/domain/usecases/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}

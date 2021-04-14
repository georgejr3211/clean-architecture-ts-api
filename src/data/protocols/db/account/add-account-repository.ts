import { AccountModel } from '@/domain/entities/account';
import { AddAccountModel } from '@/domain/usecases';

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}

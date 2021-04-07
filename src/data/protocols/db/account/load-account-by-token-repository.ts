import { AccountModel } from '@/domain/entities'

export interface LoadAccountByTokenRepository {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel>
}

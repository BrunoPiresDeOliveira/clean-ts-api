import type { AccountModel, AddAccount, AddAccountParams } from '../controllers/account/signup/signup-controller-protocols'
import { mockAccountModel } from '@/domain/test'
import type { Authentication, AuthenticationParams } from '../controllers/account/login/login-controller-protocols'
import type { LoadAccountByToken } from '../middlewares/auth-middleware-protocols'
import type { AuthenticationModel } from '@/domain/models/authentication'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()
      return await new Promise(resolve => {
        resolve(fakeAccount)
      })
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return {
        accessToken: 'any_token',
        name: 'any_name'
      }
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}

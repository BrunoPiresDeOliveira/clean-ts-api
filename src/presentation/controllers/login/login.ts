import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import type { HttpRequest, HttpResponse } from '../../protocols'
import type { Controller } from '../../protocols/controller'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise(resolve => {
      resolve(badRequest(new MissingParamError('email')))
    })
  }
}

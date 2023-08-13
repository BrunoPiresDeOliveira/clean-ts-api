import type { Router } from 'express'
import { makeSignUpController } from '../factories/controllers/account/signup/signup-controller-factory'
import { adaptRoute } from '../adapters/express-routes'
import { makeLoginController } from '../factories/controllers/account/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}

import { adaptMiddleware } from '../adapters/express-middleware-routes'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())

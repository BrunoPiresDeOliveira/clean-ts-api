import type { Router } from 'express'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory'
import { adaptRoute } from '../adapters/express/express-routes'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}

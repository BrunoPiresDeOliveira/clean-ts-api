import type { SurveyModel } from '../../models/survey'

export type AddSurveyParam = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add: (data: AddSurveyParam) => Promise<void>
}

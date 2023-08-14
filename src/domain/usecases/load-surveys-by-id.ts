import type { SurveyModel } from '../models/survey'

export interface LoadSurveyById {
  loadById: () => Promise<SurveyModel>
}

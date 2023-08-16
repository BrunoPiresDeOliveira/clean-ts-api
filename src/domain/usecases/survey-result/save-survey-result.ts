import type { SurveyResultModel } from '../../models/survey-result'

export type SaveSurveyResultParam = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  save: (data: SaveSurveyResultParam) => Promise<SurveyResultModel>
}

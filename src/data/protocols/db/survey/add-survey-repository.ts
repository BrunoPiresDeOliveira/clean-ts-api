import type { AddSurveyParam } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyParam) => Promise<void>
}

import type { LoadSurveyResultRepository } from '../protocols/db/survey-result/load-survey-result-repository'
import type { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-survey-result-repository'
import type { SaveSurveyResultParams, SurveyResultModel } from '../usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {}
  }
  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}

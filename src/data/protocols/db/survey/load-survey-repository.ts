import { SurveyModel } from '@/domain/entities/survey'

export interface LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}

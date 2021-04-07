import { SurveyModel } from '@/domain/entities/survey'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}

import { SurveyModel } from '../entities/survey'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}

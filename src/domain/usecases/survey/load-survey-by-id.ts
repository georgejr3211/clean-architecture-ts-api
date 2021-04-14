import { SurveyModel } from '@/domain/entities/survey';

export interface LoadSurveyById {
  loadById: (id: number) => Promise<SurveyModel>
}

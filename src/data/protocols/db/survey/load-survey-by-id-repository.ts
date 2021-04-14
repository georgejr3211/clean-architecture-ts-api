import { SurveyModel } from '@/domain/entities/survey';

export interface LoadSurveyByIdRepository {
  loadById: (id: number) => Promise<SurveyModel>
}
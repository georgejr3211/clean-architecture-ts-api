export interface SurveyModel {
  id: number
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export interface SurveyAnswerModel {
  image?: string
  answer: string
}

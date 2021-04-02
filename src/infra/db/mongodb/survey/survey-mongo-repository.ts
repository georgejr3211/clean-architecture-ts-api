import { AddSurveyRepository } from '../../../../data/protocols/db/add-survey/add-survey-repository'
import { AddSurveyModel } from '../../../../domain/usecases'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (data: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }
}

import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository';
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository';
import { SurveyModel } from '@/domain/entities/survey';
import { AddSurveyModel } from '@/domain/usecases';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { ObjectId } from 'bson';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add(data: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(data);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const surveys: SurveyModel[] = await surveyCollection.find().toArray();
    return MongoHelper.mapCollection(surveys);
  }

  async loadById(id: number): Promise<SurveyModel> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const survey: SurveyModel = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.map(survey);
  }

}

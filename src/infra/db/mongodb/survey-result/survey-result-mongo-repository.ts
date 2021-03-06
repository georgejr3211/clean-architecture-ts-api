import {
  SaveSurveyResultModel,
  SaveSurveyResultRepository,
  SurveyResultModel,
} from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols';

import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {

    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        const surveyCollection = MongoHelper.getCollection('surveyResults');
        const res = await surveyCollection.findOneAndUpdate({
            surveyId: data.surveyId,
            accountId: data.accountId
        }, {
            $set: {
                answer: data.answer,
                date: data.date
            }
        }, {
            upsert: true,
            returnOriginal: false
        });

        return res.value && MongoHelper.map(res.value);
    }

}
import { AccountModel, SurveyModel } from '@/domain/entities';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import MockDate from 'mockdate';
import { Collection } from 'mongodb';

import { SurveyResultMongoRepository } from './survey-result-mongo-repository';

const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository();
};

const makeSurvey = async (): Promise<SurveyModel> => {
    const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
            { image: 'any_image', answer: 'any_answer' },
            { image: 'other_image', answer: 'other_answer' }
        ],
        date: new Date()
    });

    return res.ops[0] && MongoHelper.map(res.ops[0]);
};

const makeAccount = async (): Promise<AccountModel> => {
    const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
    });

    return res.ops[0] && MongoHelper.map(res.ops[0]);
};

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

describe('Survey Result Mongo Repository', () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys');
        await surveyCollection.deleteMany({});

        surveyResultCollection = await MongoHelper.getCollection('surveyResults');
        await surveyCollection.deleteMany({});

        accountCollection = await MongoHelper.getCollection('accounts');
        await accountCollection.deleteMany({});
    });

    describe('save()', () => {
        test('Should add a survey result if its new', async () => {
            const sut = makeSut();
            const survey = await makeSurvey();
            const account = await makeAccount();
            const surveyResult = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[0].answer,
                date: new Date()
            });
            
            expect(surveyResult).toBeTruthy();
            expect(surveyResult.id).toBeTruthy();
            expect(surveyResult.answer).toBe(survey.answers[0].answer);
        });

        test('Should update a survey result if its not new', async () => {
            const sut = makeSut();
            const survey = await makeSurvey();
            const account = await makeAccount();
            
            const res = await surveyResultCollection.insertOne({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[0].answer,
                date: new Date()
            })

            const surveyResult = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[1].answer,
                date: new Date()
            });
            
            expect(surveyResult).toBeTruthy();
            expect(surveyResult.id).toEqual(res.ops[0]._id);
            expect(surveyResult.answer).toBe(survey.answers[1].answer);
        });
    });

});

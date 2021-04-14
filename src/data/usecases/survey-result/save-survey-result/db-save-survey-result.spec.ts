import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository';
import MockDate from 'mockdate';

import { DbSaveSurveyResult } from './db-save-survey-result';
import { SaveSurveyResultModel, SurveyResultModel } from './db-save-survey-result-protocols';

const makeFakeSaveSurveyResult = (): SurveyResultModel => {
    return {
        id: 1,
        surveyId: 1,
        accountId: 1,
        answer: 'any_answer',
        date: new Date(),
    };
};

const makeFakeSaveSurveyResultData = (): SaveSurveyResultModel => ({
    surveyId: 1,
    accountId: 1,
    answer: 'any_answer',
    date: new Date(),
});

const makeSaveSurveyResultRepositoryStub = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
            return await new Promise(resolve => resolve(makeFakeSaveSurveyResult()));
        }
    }

    return new SaveSurveyResultRepositoryStub();
};

interface SutTypes {
    sut: DbSaveSurveyResult;
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
}

const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub();
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);

    return {
        sut,
        saveSurveyResultRepositoryStub
    };
};

describe('DbSaveSurveyResult Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test('Should call SaveSurveyResultRepository with correct values', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut();
        const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
        const surveyResultData = makeFakeSaveSurveyResultData();
        await sut.save(surveyResultData);
        expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
    });

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut();
        jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const surveyResultData = makeFakeSaveSurveyResultData();
        const promise = sut.save(surveyResultData);
        expect(promise).rejects.toThrowError();
    });

    test('Should return survey result on success', async () => {
        const { sut } = makeSut();
        const surveyResultData = makeFakeSaveSurveyResultData();
        const surveyResult = await sut.save(surveyResultData);
        expect(surveyResult).toEqual(makeFakeSaveSurveyResult());
    });
});

import { SurveyModel, SurveyResultModel } from '@/domain/entities';
import { SaveSurveyResultModel } from '@/domain/usecases';
import MockDate from 'mockdate';

import { SaveSurveyResultController } from './save-survey-result-controller';
import {
    forbidden,
    HttpRequest,
    internalServerError,
    InvalidParamError,
    LoadSurveyByIdRepository,
    ok,
    SaveSurveyResultRepository,
} from './save-survey-result-controller-protocols';

interface SutTypes {
    sut: SaveSurveyResultController,
    loadSurveyByIdRepository: LoadSurveyByIdRepository,
    saveSurveyResultRepository: SaveSurveyResultRepository
}

const makeFakeRequest = (): HttpRequest => ({
    params: {
        surveyId: 1
    },
    body: {
        answer: 'any_answer'
    },
    accountId: 1
});

const makeFakeSurvey = (): SurveyModel => ({
    id: 1,
    answers: [
        { answer: 'any_answer' }
    ],
    date: new Date(),
    question: 'any_question'
});

const makeFakeSurveyResult = (): SurveyResultModel => ({
    id: 1,
    surveyId: 1,
    accountId: 1,
    answer: 'any_answer',
    date: new Date()
});

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        loadById(id: number): Promise<SurveyModel> {
            return new Promise(resolve => resolve(makeFakeSurvey()))
        }
    }

    return new LoadSurveyByIdRepositoryStub()
};

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
            return new Promise(resolve => resolve(makeFakeSurveyResult()))
        }
    }

    return new SaveSurveyResultRepositoryStub()
};

const makeSut = (): SutTypes => {
    const loadSurveyByIdRepository = makeLoadSurveyByIdRepository()
    const saveSurveyResultRepository = makeSaveSurveyResultRepository()
    const sut = new SaveSurveyResultController(loadSurveyByIdRepository, saveSurveyResultRepository);

    return {
        sut,
        loadSurveyByIdRepository,
        saveSurveyResultRepository
    };
};

describe('SaveSurveyResult Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test('Should call LoadSurveyByIdRepository with correct values', async () => {
        const { sut, loadSurveyByIdRepository } = makeSut()
        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepository, 'loadById')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(loadByIdSpy).toHaveBeenCalledWith(httpRequest.params.surveyId)
    });

    test('Should return 403 if LoadSurveyByIdRepository returns null', async () => {
        const { sut, loadSurveyByIdRepository } = makeSut()
        jest.spyOn(loadSurveyByIdRepository, 'loadById').mockReturnValueOnce(Promise.resolve(null))
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    });

    test('Should return 500 if LoadSurveyByIdRepository throws', async () => {
        const { sut, loadSurveyByIdRepository } = makeSut()
        jest.spyOn(loadSurveyByIdRepository, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(internalServerError(new Error()))
    });

    test('Should return 403 if an invalid answer is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = makeFakeRequest()
        httpRequest.body.answer = 'wrong_answer'
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
    });

    test('Should call SaveSurveyResultRepository with correct values', async () => {
        const { sut, saveSurveyResultRepository } = makeSut()
        const saveSpy = jest.spyOn(saveSurveyResultRepository, 'save')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(saveSpy).toHaveBeenCalledWith({
            surveyId: httpRequest.params.surveyId,
            accountId: 1,
            date: new Date(),
            answer: 'any_answer'
        })
    });

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(ok(makeFakeSurveyResult()))
    });
});
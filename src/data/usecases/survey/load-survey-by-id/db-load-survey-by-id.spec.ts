import MockDate from 'mockdate';

import { DbLoadSurveyById } from './db-load-survey-by-id';
import { LoadSurveyByIdRepository, SurveyModel } from './db-load-survey-by-id-protocols';

const makeFakeSurvey = (): SurveyModel => {
    return {
        id: 1,
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }],
        date: new Date()
    };
};

const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById(id: number): Promise<SurveyModel> {
            return await new Promise(resolve => resolve(makeFakeSurvey()));
        }
    }

    return new LoadSurveyByIdRepositoryStub();
};

interface SutTypes {
    sut: DbLoadSurveyById;
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub();
    const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);

    return {
        sut,
        loadSurveyByIdRepositoryStub
    };
};

describe('DbLoadSurveyById Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test('Should call LoadSurveyByIdRepository', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = makeSut();
        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
        await sut.loadById(1);
        expect(loadByIdSpy).toHaveBeenCalledWith(1);
    });

    test('Should return survey on success', async () => {
        const { sut } = makeSut();
        const survey = await sut.loadById(1);
        expect(survey).toEqual(makeFakeSurvey());
    });

    test('Should throw LoadSurveyByIdRepository throws', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = makeSut()
        jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.loadById(1)
        expect(promise).rejects.toThrow()
      })
});
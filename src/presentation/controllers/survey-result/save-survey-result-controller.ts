import {
    Controller,
    forbidden,
    HttpRequest,
    HttpResponse,
    internalServerError,
    InvalidParamError,
    LoadSurveyByIdRepository,
    ok,
    SaveSurveyResultRepository,
} from './save-survey-result-controller-protocols';


export class SaveSurveyResultController implements Controller {
    constructor(
        private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
        private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    ) {

    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params;
            const { answer } = httpRequest.body;
            const { accountId } = httpRequest;
            
            const survey = await this.loadSurveyByIdRepository.loadById(surveyId);

            if (survey) {
                const answers = survey.answers.map(a => a.answer);
                if (!answers.includes(answer)) {
                    return forbidden(new InvalidParamError('answer'));
                }
            } else {
                return forbidden(new InvalidParamError('surveyId'));
            }

            const surveyResult = await this.saveSurveyResultRepository.save({
                surveyId,
                answer,
                accountId: accountId,
                date: new Date()
            });

            return ok(surveyResult);
        } catch (error) {
            return internalServerError(error);
        }
    }
}
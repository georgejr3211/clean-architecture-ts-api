import { LoadSurveys } from '@/domain/usecases';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/controllers/survey/load-surveys/load-surveys-controller-protocols';
import { internalServerError, noContent, ok } from '@/presentation/helpers/http/http-helper';

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return internalServerError(error)
    }
  }
}

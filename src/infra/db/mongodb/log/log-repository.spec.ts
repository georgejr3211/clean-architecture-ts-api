import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LogMongoRepository } from './log-repository'

const makeSut = (): LogMongoRepository => {
  const sut = new LogMongoRepository()
  return sut
}
describe('Log Mongo Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_error'
    await sut.logError(fakeError.stack)
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})

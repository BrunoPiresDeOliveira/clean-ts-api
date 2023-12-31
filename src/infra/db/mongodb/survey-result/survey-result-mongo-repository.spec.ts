import { ObjectId, type Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import type { SurveyModel } from '@/domain/models/survey'
import type { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeAccount = async (): Promise<AccountModel> => {
  const account = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  })
  const result = await accountCollection.findOne({ _id: account.insertedId })
  return result && MongoHelper.map(result)
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const survey = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer_1'
    }, {
      answer: 'any_answer_2'
    }, {
      answer: 'any_answer_3'
    }
    ],
    date: new Date()
  })
  const result = await surveyCollection.findOne({ _id: survey.insertedId })
  return result && MongoHelper.map(result)
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const res = await surveyResultCollection.findOne({
        surveyId: survey.id,
        accountId: account.id
      })
      expect(res).toBeTruthy()
    })

    test('Should update survey result if its not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection
        .find({
          surveyId: survey.id,
          accountId: account.id
        })
        .toArray()
      expect(surveyResult).toBeTruthy()
    })

    describe('loadBySurveyId()', () => {
      test('Should load survey result', async () => {
        const survey = await makeSurvey()
        const account = await makeAccount()
        await surveyResultCollection.insertMany([{
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date()
        }, {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date()
        }, {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[1].answer,
          date: new Date()
        }, {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[1].answer,
          date: new Date()
        }])
        const sut = makeSut()
        const surveyResult = await sut.loadBySurveyId(survey.id)
        expect(surveyResult).toBeTruthy()
        expect(surveyResult.surveyId).toEqual(survey.id)
        expect(surveyResult.answers[0].count).toBe(2)
        expect(surveyResult.answers[0].percent).toBe(50)
        expect(surveyResult.answers[1].count).toBe(2)
        expect(surveyResult.answers[1].percent).toBe(50)
        expect(surveyResult.answers[2].count).toBe(0)
        expect(surveyResult.answers[2].percent).toBe(0)
      })
    })
  })
})

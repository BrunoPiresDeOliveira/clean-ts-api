import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import type { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (admin?: string): Promise<string> => {
  const account: {
    name: string
    email: string
    password: string
    role?: string
  } = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: '123'
  }
  if (admin) account.role = admin
  await accountCollection.insertOne(account)
  const res = await accountCollection.findOne({ name: 'any_name' })
  const id = res?._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })
      const { _id } = await surveyCollection.findOne({ question: 'any_question' })
      await request(app)
        .put(`/api/surveys/${_id.toString()}/results`)
        .set('x-access-token', await makeAccessToken())
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result with accessToken', async () => {
      await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })
      const { _id } = await surveyCollection.findOne({ question: 'any_question' })
      await request(app)
        .get(`/api/surveys/${_id.toString()}/results`)
        .set('x-access-token', await makeAccessToken())
        .expect(200)
    })
  })
})

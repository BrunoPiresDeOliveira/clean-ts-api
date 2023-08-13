import { MongoClient, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri?: string): Promise<void> {
    this.uri = uri
    if (!uri) throw new Error('URI mongodb undefined')
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (document: any): any => {
    const { _id, ...accountWithoutId } = document
    return { ...accountWithoutId, id: _id }
  }
}

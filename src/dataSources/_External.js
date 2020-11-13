// ./src/dataSources/_External.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class External extends MongoDataSource {
  async getAll(query, opts) {
    return await this.collection.find(query, opts).toArray()
  }
}

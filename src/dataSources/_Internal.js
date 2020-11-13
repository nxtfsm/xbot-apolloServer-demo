// ./src/dataSources/_Internal.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Internal extends MongoDataSource {
  async getAll(query, opts) {
    return await this.collection.find(query, opts).toArray()
  }
}

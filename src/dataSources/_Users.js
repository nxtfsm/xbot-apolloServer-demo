// ./src/dataSources/_Users.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Users extends MongoDataSource {
  async getAll(query, opts) {
    return await this.collection.find(query, opts).toArray()
  }

  async findActive(query, opts) {
    return await this.collection.find(query, opts).toArray()
  }
}

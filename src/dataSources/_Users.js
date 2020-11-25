// ./src/dataSources/_Users.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Users extends MongoDataSource {
  async loginUser(query, update, opts = {}) {
    opts.returnOriginal = false;
    const response = await this.collection
      .findOneAndUpdate(query, update, opts);
    return response.value || false;
  }

  async createUser(userRecord) {
    const result = await this.collection.insertOne(userRecord);
    return result ? result.ops[0] : false;
  }

  async updateUser(query, update, opts = {}) {
    opts.returnOriginal = false;
    const response = await this.collection
      .findOneAndUpdate(query, update, opts);
    return response.value || false;
  }
}

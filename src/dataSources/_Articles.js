// ./src/dataSources/_External.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Articles extends MongoDataSource {
  async getAll(query, opts = {}) {
    return await this.collection.find(query, opts).toArray();
  }

  async createNew(doc, opts = {}) {
    const response = await this.collection.insertOne(doc, opts);
    return response.result.ok === 1 ? response.ops[0] : false;
  }

  async findAndUpdate(filter, update, opts = {}) {
    opts.returnOriginal = false;
    return await this.collection
      .findOneAndUpdate(filter, update, opts) || false;
  }

  async findOneAndDelete(filter, opts = {}) {
    return await this.collection.findOneAndDelete(filter, opts) || false;
  }

}

// ./src/dataSources/_External.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Articles extends MongoDataSource {
  async getAll(query, opts = {}) {
    return await this.collection.find(query, opts).toArray();
  }

  async createNew(doc, opts = {}) {
    const result = await this.collection.insertOne(doc, opts);
    return result ? result.ops[0] : false;
  }

  async findAndUpdate(filter, update, opts = {}) {
    opts.returnOriginal = false;
    const res = await this.collection.findOneAndUpdate(filter, update, opts);
    return res ? res.value : false;
  }

  async findOneAndDelete(filter, opts = {}) {
    const result = await this.collection.findOneAndDelete(filter, opts);
    return result || false;
  }

}

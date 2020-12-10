// ./src/dataSources/_CodePens.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class CodePens extends MongoDataSource {
  async getPreviews(query, opts = {}) {
    return {
      codePens: await this.collection.find(query, opts).toArray(),
      estCount: await this.collection.estimatedDocumentCount(),
    };
  }

  async createNew(doc, opts = {}) {
    const response = await this.collection.insertOne(doc, opts);
    return response.result.ok === 1 ? response.ops[0] : false;
  }
}

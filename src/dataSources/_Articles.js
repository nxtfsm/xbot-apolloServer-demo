// ./src/dataSources/_External.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Articles extends MongoDataSource {
  async getAll(query, opts = {}) {
    return await this.collection.find(query, opts).toArray();
  }

  createNew(doc, opts = {}) {
    return new Promise((resolve, reject) => {
      this.collection.insertOne(doc, opts,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.ops[0]);
        });
    });
  }

  findOneAndUpdate(filter, update, opts = {}) {
    opts.returnOriginal = false;

    return new Promise((resolve, reject) => {
      this.collection.findOneAndUpdate(filter, update, opts,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.value);
        });
    });
  }

  findOneAndDelete(filter, opts = {}) {
    return new Promise((resolve, reject) => {
      this.collection.findOneAndDelete(filter, opts,
        (err, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        });
    });
  }

}

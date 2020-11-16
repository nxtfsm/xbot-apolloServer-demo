// ./src/dataSources/_Internal.js
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Internal extends MongoDataSource {
  async getAll(query, opts) {
    return await this.collection.find(query, opts).toArray()
  }

  createNew(doc, opts) {
    return new Promise((resolve, reject) => {
     this.collection.insertOne(doc, opts,
       (err, result) => {
        if (err) {
           console.log(err)
           reject(err)
          }
        resolve(result.ops[0])
      })
    })
  }

}

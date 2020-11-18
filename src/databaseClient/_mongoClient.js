// ./src/databaseClient/_mongoClient.js
import { MongoClient } from 'mongodb';

const logRoot = 'Remote Connection Status: ';
let mongoDB;

export default {
  connect: (uri) => __connect(uri),
  getDB: () => __getDB(),
};

function __connect(mongoUri) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      mongoUri,
      { useNewUrlParser: true, useUnifiedTopology: true},
      (err, client) => {
        if (err) {
          const logStr = `${logRoot} Connection failed with err: ${err}`;
          reject(logStr);
        } else {
          mongoDB = client.db('xbotDemo');
          const logStr = `${logRoot} xbotDemo mongoDB Connected`;
          resolve(logStr);
        }
      });
  });
}

function __getDB() { return mongoDB; }

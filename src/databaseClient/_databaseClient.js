// ./src/databaseClient/_databaseClient.js
import { MongoClient } from 'mongodb';

let mongoDB;

export function connect(mongoUri) {
  const logRoot = 'Remote Connection Status: '

  return new Promise((resolve, reject) => {
    MongoClient.connect(
            mongoUri,
            { useNewUrlParser: true, useUnifiedTopology: true},
            (err, client) => {
              if (err) {
                const logStr = `${logRoot} Connection failed with err: ${err}`
                reject(logStr)
              } else {
                mongoDB = client.db('xbotDemo')
                const logStr = `${logRoot} xbotDemo mongoDB Connected`
                resolve(logStr)
              }
            });

  })
}

export const getDB = () => mongoDB

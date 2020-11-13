// ./src/databaseClient/_databaseClient.js
import { MongoClient } from 'mongodb';

let mongoDB;

export async function connect(onResolve) {
  return new Promise((resolve, reject) => {
    const uri = process.env.MONGODB_URI;
    //const uri = 'foo';

    MongoClient.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true},
            (err, client) => {
              if (err) {
                const logStr = `Connection failed with err: ${err}`
                reject(logStr)
              } else {
                mongoDB = client.db('xbotDemo')
                const logStr = 'xbotDemo Connected'
                resolve(logStr)
                return
              }
            });

  })
}

export const connectly = async (callback) => {
  try {
    const uri = process.env.MONGODB_URI;
          result = await MongoClient.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true},
            (err, client) => {
              if (err) {
                //return 'err';
                console.log('err' + err)
              } else {
                mongoDB = client.db('xbotDemo')
                console.log('xbotDemo connected')
                //return true;
              }
            });
          //console.log(result)
          /*if (result) {
            callback()
          }*/
        }
  catch {
    console.log('connection error')
  }
}

export const connector = () => {
  return new Promise ((resolve, reject) => {
    const uri = process.env.MONGODB_URI;


  })

  MongoClient.connect(
    uri,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err, client) => {
      mongoDB = client.db('xbotDemo')

      if (err) {
        console.log('err')
      } else {
        console.log('DB Ok')
      }
    }
  )
}

export const getDB = () => mongoDB

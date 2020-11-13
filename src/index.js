// ./src/index.js
import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import databaseClient from './databaseClient';
import logger from './__debugger__';

const debugging = process.env.NODE_ENV;

const server = async () => {
      const port = process.env.PORT,
            app = new ApolloServer({ ...schema });

      app.listen({ port: process.env.PORT })
         .then( ({url}) => {
           const msg = `🚀 Server ready at ${url}`
           logger(msg)
          });

}

databaseClient.connect()
  .then((res) => {
      if (debugging) {
        const msg = `Remote Connection Status: ${res}`
        logger(msg)
        }
      server()
    })
  .catch((res) => {
      if (debugging) {
        const msg = `Remote Connection Status: ${res}`
        logger(msg)
        }
      process.exit()
    })

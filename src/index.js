// ./src/index.js
import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import databaseClient from './databaseClient';
import logger from './__debugger__';

const debugging = process.env.NODE_ENV,
      mongoURI = process.env.MONGODB_URI;

const server = async () => {
      const port = process.env.PORT,
            app = new ApolloServer({ ...schema });

      app.listen({ port })
         .then( ({url}) => {
           const msg = `🚀 Server ready at ${url}`
           logger(msg)
          });

}

databaseClient.connect(mongoURI)
  .then((res) => {
      !!debugging ? logger(res) : null;
      server();
    })
  .catch((res) => {
      logger(res);
      process.exit();
    });

// ./src/index.js
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import databaseClient from './databaseClient';
import logger from './__debugger__';

export default function(config) {
  const {
    remoteURI,
    onPort,
    debugging
  } = config;

  databaseClient.connect(remoteURI)
    .then((res) => {
        !!debugging ? logger(res) : null;
        server(onPort);
      })
    .catch((res) => {
        logger(res);
        process.exit();
      });
}

async function server(port) {
      const app = new ApolloServer({ ...schema });

      app.listen({ port })
         .then( ({url}) => {
           const msg = `🚀 Server ready at ${url}`
           logger(msg)
          });

}

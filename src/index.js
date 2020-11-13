// ./src/index.js
import { ApolloServer } from 'apollo-server';

import schema from './schema';
import databaseClient from './databaseClient';
import dataSources from './dataSources';

import logger from './__debugger__';

export default function(config) {
  const {
    remoteURI,
    onPort,
    debugging
  } = config;

  databaseClient.connect(remoteURI)
    .then((res) => {
        !!debugging ? logger(res) : logger();
        server(onPort);
      })
    .catch((res) => {
        logger(res);
        process.exit();
      });
}

async function server(port) {
      const db = databaseClient.getDB(),
            app = new ApolloServer({
              ...schema,
              dataSources: () => dataSources(db)
            });

      app.listen({ port })
         .then( ({url}) => {
           const msg = `🚀 Server ready at ${url}`
           logger(msg)
          });

}

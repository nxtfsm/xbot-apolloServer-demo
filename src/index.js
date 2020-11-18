// ./src/index.js
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import databaseClient from './databaseClient';
import dataSources from './dataSources';
import logger from './__debugger__';

export default async function(config) {
  const { port, remoteURI, debugging } = config;
  const server = new ApolloServer({
    ...schema,
    dataSources: () => dataSources(databaseClient.getDB()),
  });

  server.listen({ port })
    .then(({url}) => {
      databaseClient.connect(remoteURI)
        .then((res, rej) => {
          const activeMsg = `🖖 Server ready at ${url}`;
          debugging ? logger({info: res}) : logger();
          logger(activeMsg);
        })
        .catch((rej) => {
          logger({err: rej});
          process.exit();
        });
    });
}

export { logger };

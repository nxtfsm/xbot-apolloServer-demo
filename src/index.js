// ./src/index.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import databaseClient from './databaseClient';
import dataSources from './dataSources';
import logger from './__debugger__';

export default async function(app, config) {
  const { port, remoteURI, debugging } = config;
  if (!app) process.exit();

  const server = new ApolloServer({
    ...schema,
    dataSources: () => dataSources(databaseClient.getDB()),
  });

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    databaseClient.connect(remoteURI)
      .then((res, rej) => {
        const activeMsg = `🖖 Server ready at http://localhost:${port}`;
        debugging ? logger({info: res}) : logger();
        logger(activeMsg);
      })
      .catch((rej) => {
        logger({err: rej});
        process.exit();
      });
  });
}

export function launchExpress(port) {
  let status = null;
  try {
    const app = express();
    status = app;
  } catch {
    logger({err: 'express error!'});
  } finally {
    return status;
  }
}

// ./src/index.js
import { ApolloServer } from 'apollo-server-express';
import databaseClient from './databaseClient';
import dataSources from './dataSources';
import logger from './__debugger__';
import schema from './schema';
import { validateToken } from './middleware';

export default async function Server(app, config) {
  if (!app) process.exit();
  const { port, remoteURI, debugging } = config;

  const server = new ApolloServer({
    ...schema,
    dataSources: () => dataSources(databaseClient.getDB()),
    context: async({ req }) => ({
      authorization: await validateToken(req)
        .then((account) => account || { level: 'public' })
        .catch((err) => {
          logger({err: err});
          return { level: 'public' };
        }),
    }),
  });

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    databaseClient.connect(remoteURI)
      .then((res, rej) => {
        const activeMsg = `🖖 at http://localhost:${port}/graphql`;
        debugging ? logger({info: res}) : logger();
        logger(activeMsg);
      })
      .catch((rej) => {
        logger({err: rej});
        process.exit();
      });
  });
}

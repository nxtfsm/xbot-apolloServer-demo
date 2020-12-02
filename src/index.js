// ./src/index.js
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import databaseClient from './databaseClient';
import dataSources from './dataSources';
import logger from './__debugger__';
import launchExpress from './_authExpress';
import authApplication from './_authApplication';
export { launchExpress, authApplication };

export default async function(app, config) {
  if (!app) process.exit();
  const { port, remoteURI, debugging } = config;

  const server = new ApolloServer({
    ...schema,
    dataSources: () => dataSources(databaseClient.getDB()),
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      return { token };
    },
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

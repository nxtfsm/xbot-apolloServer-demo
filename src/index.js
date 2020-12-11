// ./src/index.js
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
// import bulkImporter from './bulkImporter';
// import { addCodePen, fileUpload } from './bulkImporter';
import databaseClient from './databaseClient';
import dataSources from './dataSources';
import logger from './__debugger__';
import schema from './schema';
import { validateToken } from './middleware';

export default async function Server(app, config) {
  if (!app) process.exit();
  const { PORT: port, MONGODB_URI: remoteURI, debugging } = config;

  const server = new ApolloServer({
    ...schema,
    uploads: false,
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

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    databaseClient.connect(remoteURI)
      .then((res, rej) => {
        const activeMsg = `🖖 at http://localhost:${port}/graphql`;
        debugging ? logger({ info: res }) : logger();
        logger(activeMsg);
        // bulkImporter(port)
        // addCodePen(port)
        // fileUpload(port)
      })
      .catch((rej) => {
        logger({err: rej});
        process.exit();
      });
  });


}

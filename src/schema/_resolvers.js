// ./src/schema/_resolvers.js
export default {
  Query: {
    tutorials: async (_, args={
        internalOrigin, title, externalUrl, content, summary, postedBy
      }, { dataSources }) => {
        const input = await __inputConstructor(args);
        return !!args.internalOrigin
                ? dataSources.internalArticles.getAll(input, {})
                : dataSources.externalArticles.getAll(input, {})
              },

    activeUser: (_, { atXavierAccount }, { dataSources }) => {
        const query = { atXavierAccount: atXavierAccount }
        return dataSources.users.findActive(query, {})
    }
  },

  Mutation: {
    createTutorial: async (_, args={
      internalOrigin, title, externalUrl, content, summary, postedBy
    }, { dataSources }) => {
      const input = await __inputConstructor(args);
      return !!args.internalOrigin
              ? dataSources.internalArticles.createNew(input, {})
                  .then((result) => result)
                  .catch((result) => null)
              : dataSources.externalArticles.createNew(input, {})
                  .then((result) => result)
                  .catch((result) => null)
    }

    /*updateTutorial: async (origin, args={
      internalOrigin, title, externalUrl, content, summary, postedBy
    }, { dataSources }) => {
      const doc = await __docConstructor(args);
      if (args.internalOrigin) {

      }
    }*/
  }
}

function __inputConstructor(args) {
  const docArgs = {};

  Object.entries(args).map(([key, value]) => {
    if (value && key !== 'internalOrigin') {
      docArgs[key] = value
    }
  });

  return docArgs
}

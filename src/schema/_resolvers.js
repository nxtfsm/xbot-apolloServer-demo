// ./src/schema/_resolvers.js
import { logger } from '../'

export default {
  Query: {
    tutorials: async (parent, { input }, { dataSources }) => {
        const args = await __inputConstructor(input);
        return {
          collection: !! input.internalOrigin ? 'internal' : 'external',
          articles: !!input.internalOrigin
              ? dataSources.internalArticles.getAll(args, {})
              : dataSources.externalArticles.getAll(args, {})
            }
          },

    activeUser: (_, { atXavierAccount }, { dataSources }) => {
        const query = { atXavierAccount: atXavierAccount }
        return dataSources.users.findActive(query, {})
    }
  },

  Mutation: {
    createTutorial: async (_, { input }, { dataSources }) => {
      const args = await __inputConstructor(input);
      return !!input.internalOrigin
              ? dataSources.internalArticles.createNew(args, {})
                  .then((result) => result)
                  .catch((result) => {
                    logger({'err': result})
                    return null
                  })
              : dataSources.externalArticles.createNew(input, {})
                  .then((result) => result)
                  .catch((result) => {
                    logger({'err': result})
                    null
                  })
    },

    updateTutorial: async (origin, { input }, { dataSources }) => {
      const doc = await __docConstructor(args);
      if (args.internalOrigin) {

      }
    }
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

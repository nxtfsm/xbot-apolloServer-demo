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
      const { create } = __mutationConstructor(input, dataSources);
      return await create()
    },

    updateTutorial: async (origin, { input }, { dataSources }) => {
      const { update } = __mutationConstructor(input, dataSources);

    }
  }
}

function __mutationConstructor(input, dataSources) {
  const args = __inputConstructor(input);
  dataSources.inCollection = !!input.internalOrigin
        ? dataSources.internalArticles
        : dataSources.externalArticles;

  return {
    create: () => dataSources.inCollection.createNew(args, {})
                    .then((result) => {
                      return { successStatus: true, updatedArticle: result };
                    })
                    .catch((result) => {
                      logger({'err': result})
                      return { successStatus: false, updatedArticle: null };
                    }),
    update: () => console.log('updater goes here')
  }
}

function __inputConstructor(input) {
  const args = {};

  Object.entries(input).map(([key, value]) => {
    if (value && key !== 'internalOrigin') {
      args[key] = value
    }
  });

  return args
}

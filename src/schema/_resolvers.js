// ./src/schema/_resolvers.js
import { logger } from '../'

export default {
  Query: {
    tutorials: async (parent, { input }, { dataSources }) => {
      const {
        collection,
        query
      } = await __queryConstructor(input, dataSources);

      return {
        collection,
        articles: query()
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
      return await create();
    },

    updateTutorial: async (_, { input, newValues }, { dataSources }) => {
      const { update } = __mutationConstructor(input, dataSources, newValues);
      return await update();
    }
  }
}

function __queryConstructor(input, dataSources) {
  const args = __inputConstructor(input);
  dataSources.inCollection = !!input.internalOrigin
        ? dataSources.internalArticles
        : dataSources.externalArticles;
  return {
    args,
    collection: !!input.internalOrigin ? 'internal' : 'external',
    query: () => dataSources.inCollection.getAll(args)
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

function __mutationConstructor(input, dataSources, newValues={}) {
  const { args } = __queryConstructor(input, dataSources);

  return {
    create: () => dataSources.inCollection.createNew(args, {})
                    .then((result) => {
                      return { successStatus: true, updatedArticle: result };
                    })
                    .catch((result) => {
                      logger({'err': result})
                      return { successStatus: false, updatedArticle: null };
                    }),
    update: async () => {
              const doc = { $set: { ...newValues } };
              const response = await dataSources.inCollection
                                            .findOneAndUpdate(args, doc);

              const successStatus = !!response;
              const responseMsg = !!successStatus
                            ? `updated article: ${ response._id }`
                            : 'no articles updated';
              return {
                successStatus,
                updatedArticle: response,
                message: responseMsg
              }
    }
  }
}

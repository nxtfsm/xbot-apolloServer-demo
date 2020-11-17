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
      const { create } = await __mutationConstructor(input, dataSources);
      return create();
    },

    updateTutorial: async (_, { input, newValues }, { dataSources }) => {
      const { update } = await __mutationConstructor(
        input, dataSources, newValues);
      return update();
    },

    deleteTutorial: async (_, { input }, { dataSources }) => {
      const { deleteOne } = await __mutationConstructor(input, dataSources);
      return deleteOne();
    }
  }
}

async function __mutationConstructor(input, dataSources, newValues={}) {
  const { args } = await __queryConstructor(input, dataSources);

  return {
    create: () => dataSources.inCollection.createNew(args)
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
            },
    deleteOne: async () => {
        const result = await dataSources.inCollection.findOneAndDelete(args)
        return {
          successStatus: result === 1 ? true : false,
          message: `article deleted`
        }
    }
  }
}

async function __queryConstructor(input, dataSources) {
  const args = await __inputConstructor(input);
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

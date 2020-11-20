// ./src/schema/_resolvers.js
import resolve from './resolverConstructor';

export default {
  Query: {
    tutorials: async(parent, { input }, { dataSources }) => {
      const collectKey = resolve.setCollection(input.internalOrigin);
      const collection = dataSources[collectKey];
      return {
        collection: collectKey,
        articles: await resolve.query.tutorials(input, collection),
      };
    },
  },

  Mutation: {
    createTutorial: async(_, { input }, { dataSources }) => {
      const collectKey = resolve.setCollection(input.internalOrigin);
      const collection = dataSources[collectKey];
      return await resolve.mutation.createOne(input, collection);
    },

    updateTutorial: async(_, { input, newValues }, { dataSources }) => {
      const collectKey = resolve.setCollection(input.internalOrigin);
      const collection = dataSources[collectKey];
      return await resolve.mutation.updateOne(input, collection, newValues);
    },

    deleteTutorial: async(_, { input }, { dataSources }) => {
      const collectKey = resolve.setCollection(input.internalOrigin);
      const collection = dataSources[collectKey];
      return await resolve.mutation.deleteOne(input, collection);
    },

    loginUser: async(_, { input }, { dataSources }) => {
      return await resolve.mutation.loginUser(input, dataSources.users);
    },
  },
};

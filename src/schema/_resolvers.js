// ./src/schema/_resolvers.js
import resolve from './resolverConstructor';

export default {
  Query: {
    tutorials: async(parent, { input }, { dataSources }) => {
      const collection = resolve.setCollection(input.internalOrigin);
      return {
        collection,
        articles: await resolve.query
          .tutorials(input, dataSources[collection]),
      };
    },
  },

  Mutation: {
    createTutorial: async(_, { input }, { dataSources }) => {
      return await resolve.mutation.createOne(input, dataSources);
    },

    updateTutorial: async(_, { input, newValues }, { dataSources }) => {
      return await resolve.mutation.updateOne(input, dataSources, newValues);
    },

    deleteTutorial: async(_, { input }, { dataSources }) => {
      return await resolve.mutation.deleteOne(input, dataSources);
    },

    loginUser: async(_, { input }, { dataSources }) => {
      return await resolve.mutation.loginUser(input, dataSources.users);
    },
  },
};

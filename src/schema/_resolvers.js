// ./src/schema/_resolvers.js
import constructor from './resolverConstructor';

export default {
  Query: {
    tutorials: async(parent, { input }, { dataSources }) => {
      return await constructor.query.tutorials(input, dataSources);
    },
  },

  Mutation: {
    createTutorial: async(_, { input }, { dataSources }) => {
      return await constructor.mutation.createOne(input, dataSources);
    },

    updateTutorial: async(_, { input, newValues }, { dataSources }) => {
      return await constructor.mutation
        .updateOne(input, dataSources, newValues);
    },

    deleteTutorial: async(_, { input }, { dataSources }) => {
      return await constructor.mutation.deleteOne(input, dataSources);
    },

    loginUser: async(_, { input }, { dataSources }) => {
      return await constructor.mutation.loginUser(input, dataSources);
    },
  },
};

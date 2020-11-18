// ./src/schema/_resolvers.js
import constructor from './resolverConstructor';

export default {
  Query: {
    tutorials: async(parent, { input }, { dataSources }) => {
      const {
        collection,
        query,
      } = await constructor.query.tutorials(input, dataSources);

      return { collection, articles: query() };
    },

    activeUser: async(_, { input }, { dataSources }) => {
      const query = await constructor.query.activeUser(input, dataSources);
      return { updatedUser: query() };
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
  },
};

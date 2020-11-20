// ./src/schema/_resolvers.js
import resolve from './resolverConstructor';

export default {
  Query: {
    tutorials: (parent, { input }, { dataSources }) => {
      const { key, collection } = resolve.collection(input, dataSources);
      return {
        collection: key,
        articles: resolve.query.tutorials(input, collection),
      };
    },
  },

  Mutation: {
    createTutorial: (_, { input }, { dataSources }) => {
      const { collection } = resolve.collection(input, dataSources);
      return resolve.mutation.createOne(input, collection);
    },

    updateTutorial: (_, { input, newValues }, { dataSources }) => {
      const { collection } = resolve.collection(input, dataSources);
      return resolve.mutation.updateOne(input, collection, newValues);
    },

    deleteTutorial: (_, { input }, { dataSources }) => {
      const { collection } = resolve.collection(input, dataSources);
      return resolve.mutation.deleteOne(input, collection);
    },

    loginUser: (_, { input }, { dataSources }) => {
      return resolve.mutation.loginUser(input, dataSources.users);
    },
  },
};

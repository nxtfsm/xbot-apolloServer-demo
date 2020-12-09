// ./src/schema/_resolvers.js
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import resolve from './resolverConstructor';
const { setCollection, mutation, query } = resolve;

export default {
  Query: {
    async tutorials(_, { input }, { dataSources }) {
      const { articleQuery } = input;
      const { key, collection } = setCollection(articleQuery, dataSources);
      const results = await query.tutorials(input, collection);
      return { ...results, collection: key };
    },
  },

  Mutation: {
    createTutorial(_, { input }, { dataSources }) {
      const { collection } = setCollection(input, dataSources);
      return mutation.createOne(input, collection);
    },

    updateTutorial(_, { input, newValues }, { dataSources }) {
      const { collection } = setCollection(input, dataSources);
      return mutation.updateOne(input, collection, newValues);
    },

    deleteTutorial(_, { input }, { dataSources }) {
      const { collection } = setCollection(input, dataSources);
      return mutation.deleteOne(input, collection);
    },

    loginUser(_, { input }, { dataSources }) {
      return mutation.loginUser(input, dataSources.users);
    },

    updateUser(_, { input }, { dataSources }) {
      return mutation.updateUser(input, dataSources.users);
    },
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
};

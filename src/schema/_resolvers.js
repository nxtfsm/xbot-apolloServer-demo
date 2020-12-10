// ./src/schema/_resolvers.js
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import resolve from './resolverConstructor';
const { mutation, query } = resolve;

export default {
  Query: {
    async tutorials(_, { input }, { dataSources }) {
      return await query.tutorials(input, dataSources[input.collectionName]);
    },
    async codePens(_, { input }, { dataSources }) {
      return await query.codePens(input, dataSources[input.collectionName]);
    },
  },

  Mutation: {
    createCodePen(_, { input }, { dataSources }) {
      return mutation.createOne(input, dataSources[input.collectionName]);
    },
    createTutorial(_, { input }, { dataSources }) {
      return mutation.createOne(input, dataSources[input.collectionName]);
    },

    updateTutorial(_, { input, newValues }, { dataSources }) {
      return mutation
        .updateOne(input, dataSources[input.collectionName], newValues);
    },

    deleteTutorial(_, { input }, { dataSources }) {
      return mutation.deleteOne(input, dataSources[input.collectionName]);
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

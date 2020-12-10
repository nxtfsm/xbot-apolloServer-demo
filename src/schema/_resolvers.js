// ./src/schema/_resolvers.js
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import resolve from './resolverConstructor';
const {
  query: { tutorials, codePens },
  mutation: { createOne, updateOne, deleteOne, loginUser, updateUser },
} = resolve;

export default {
  Query: {
    async tutorials(_, { input }, { dataSources }) {
      return await tutorials(input, dataSources[input.collectionName]);
    },
    async codePens(_, { input }, { dataSources }) {
      return await codePens(input, dataSources[input.collectionName]);
    },
  },

  Mutation: {
    createCodePen(_, { input }, { dataSources }) {
      return createOne(input, dataSources[input.collectionName]);
    },
    updateCodePen(_, {input, newValues }, { dataSources }) {
      return updateOne(input, dataSources[input.collectionName], newValues);
    },
    deleteCodePen(_, { input }, { dataSources }) {
      return deleteOne(input, dataSources[input.collectionName]);
    },
    createTutorial(_, { input }, { dataSources }) {
      return createOne(input, dataSources[input.collectionName]);
    },

    updateTutorial(_, { input, newValues }, { dataSources }) {
      return updateOne(input, dataSources[input.collectionName], newValues);
    },

    deleteTutorial(_, { input }, { dataSources }) {
      return deleteOne(input, dataSources[input.collectionName]);
    },

    loginUser(_, { input }, { dataSources }) {
      return loginUser(input, dataSources.users);
    },

    updateUser(_, { input }, { dataSources }) {
      return updateUser(input, dataSources.users);
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

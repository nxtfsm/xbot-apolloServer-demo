// ./src/schema/resolverConstructor/_queryConstructor.js
import inputReducer from './_inputReducer';

export default function(input, dataSources) {
  return {
    getTutorials: async() => {
      const args = await inputReducer(input);
      dataSources.inCollection = input.internalOrigin
        ? dataSources.internalArticles
        : dataSources.externalArticles;

      const articles = () => dataSources.inCollection.getAll(args);

      return {
        args,
        collection: input.internalOrigin ? 'internal' : 'external',
        articles: () => articles(),
      };
    },
  };
}

// ./src/schema/resolverConstructor/_tutorialMutations.js
import queryConstructor from './_queryConstructor';

export default async function(input, dataSources, newValues = {}) {
  const { getTutorials } = queryConstructor(input, dataSources);
  const { args } = await getTutorials();
  const doc = { $set: { ...newValues} };

  return {
    create: async() => {
      const response = await dataSources.inCollection.createNew(args);
      return {
        successStatus: response !== false,
        updatedArticle: response || null,
      };
    },
    update: async() => {
      const response = await dataSources.inCollection.findAndUpdate(args, doc);
      return {
        successStatus: response !== false,
        updatedArticle: response || null,
        message: response ? `updatedArticle: ${ response._id }`
          : 'no articles updated',
      };
    },
    deleteOne: async() => {
      const response = await dataSources.inCollection.findOneAndDelete(args);
      return {
        successStatus: response.ok === 1,
        updatedArticle: response.value ? response.value : null,
        message: response.value
          ? `deletedArticle: ${ response.value._id }`
          : `no articles deleted, clean exit: ${ response.ok === 1}`,
      };
    },
  };
}

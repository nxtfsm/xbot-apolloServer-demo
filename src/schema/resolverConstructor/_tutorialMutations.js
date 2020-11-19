// ./src/schema/resolverConstructor/_tutorialMutations.js
import queryConstructor from './_queryConstructor';

export default async function(input, dataSources, newValues = {}) {
  const { getTutorials } = queryConstructor(input, dataSources);
  const { args } = await getTutorials();
  const doc = { $set: { ...newValues} };

  const errorStr = (err = {}) => `dataSource interface error: ${err}`;

  return {
    create: async() => {
      const response = await dataSources.inCollection.createNew(args);
      return {
        successStatus: !!response,
        updatedArticle: response || null,
        message: response ? `updatedArticle: ${response._id}` : errorStr(),
      };
    },
    update: async() => {
      const response = await dataSources.inCollection.findAndUpdate(args, doc);
      return response ? {
        successStatus: response.ok === 1,
        updatedArticle: response.value ? response.value : null,
        message: response.value
          ? `updatedArticle: ${ response.value._id }`
          : `no articles updated, clean exit: ${ response.ok === 1}`,
      } : { successStatus: false, updatedArticle: null, message: errorStr() };
    },
    deleteOne: async() => {
      const response = await dataSources.inCollection.findOneAndDelete(args);
      return response ? {
        successStatus: response.ok === 1,
        updatedArticle: response.value ? response.value : null,
        message: response.value
          ? `deletedArticle: ${ response.value._id }`
          : `no articles deleted, clean exit: ${ response.ok === 1}`,
      } : { successStatus: false, updatedArticle: null, message: errorStr() };
    },
  };
}

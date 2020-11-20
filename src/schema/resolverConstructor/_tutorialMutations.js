// ./src/schema/resolverConstructor/_tutorialMutations.js
import inputReducer from './_inputReducer';

export default async function(input, inCollection, newValues = {}) {
  const args = inputReducer(input);
  const doc = { $set: { ...newValues} };

  const errorStr = (err = {}) => `dataSource interface error: ${err}`;

  return {
    create: async() => {
      const response = await inCollection.createNew(args);
      return {
        successStatus: !!response,
        updatedArticle: response || null,
        message: response ? `updatedArticle: ${response._id}` : errorStr(),
      };
    },

    update: async() => {
      const response = await inCollection.findAndUpdate(args, doc);
      return response ? {
        successStatus: response.ok === 1,
        updatedArticle: response.value ? response.value : null,
        message: response.value
          ? `updatedArticle: ${ response.value._id }`
          : `no articles updated, clean exit: ${ response.ok === 1}`,
      } : { successStatus: false, updatedArticle: null, message: errorStr() };
    },

    deleteOne: async() => {
      const response = await inCollection.findOneAndDelete(args);
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

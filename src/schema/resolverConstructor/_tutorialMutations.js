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
    deleteOne: () => dataSources.inCollection.findOneAndDelete(args)
      .then((result) => {
        const successStatus = result.ok === 1;
        const message = successStatus
          ? `deleted item ${result.value._id}`
          : `failed to delete item ${result.value._id}`;
        return {
          successStatus,
          message,
          updatedArticle: result.value,
        };
      })
      .catch((result) => {
        return {
          successStatus: result.ok === 1,
          updatedArticle: null,
          message: `error from dataSource: ${result}`,
        };
      }),
  };
}

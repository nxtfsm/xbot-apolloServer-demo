// ./src/schema/resolverConstructor/_mutationConstructor.js
import queryConstructor from './_queryConstructor';

export default async function(input, dataSources, newValues = {}) {
  const { getTutorials } = queryConstructor(input, dataSources);
  const { args } = await getTutorials();
  const doc = { $set: { ...newValues} };

  return {
    create: () => dataSources.inCollection.createNew(args)
      .then((result) => {
        return { successStatus: true, updatedArticle: result };
      })
      .catch((result) => {
        return { successStatus: false, updatedArticle: null };
      }),
    update: () => dataSources.inCollection.findOneAndUpdate(args, doc)
      .then((result) => {
        return {
          successStatus: true,
          updatedArticle: result,
          message: `updated article: ${ result._id }`,
        };
      })
      .catch((result) => {
        return {
          successStatus: false,
          updatedArticle: null,
          message: 'no article updated',
        };
      }),
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

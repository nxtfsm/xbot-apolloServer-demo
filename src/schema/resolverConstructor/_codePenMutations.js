// ./src/schema/resolverConstructor/_codepenMutations.js
import inputReducer from './_inputReducer';

export default function(input, inCollection, newValues = {}) {
  const args = inputReducer(input);
  const doc = { $set: { ...newValues } };
  const errorStr = (err = {}) => `dataSource interface error: ${err}`;

  return {
    create() {
      const response = inCollection.createNew(args);
      return {
        successStatus: !!response,
        updatedCodePen: response || null,
        message: response ? `updatedCodePen: ${response._id}` : errorStr(),
      };
    },

    async update() {
      const response = await inCollection.findAndUpdate(args, doc);
      return response ? {
        successStatus: response.ok === 1,
        updatedCodePen: response.value ? response.value : null,
        message: response.value
          ? `updatedCodePen: ${ response.value._id }`
          : `no codePens updated, clean exit: ${ response.ok === 1}`,
      } : { successStatus: false, updatedCodePen: null, message: errorStr() };
    },

    async deleteOne() {
      const response = await inCollection.findOneAndDelete(args);
      return response ? {
        successStatus: response.ok === 1,
        updatedCodePen: response.value ? response.value : null,
        message: response.value
          ? `deletedCodePen: ${ response.value._id }`
          : `no codePens deleted, clean exit: ${ response.ok === 1}`,
      } : { successStatus: false, updatedCodePen: null, message: errorStr() };
    },
  };
}

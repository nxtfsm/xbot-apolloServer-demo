// ./src/schema/resolverConstructor/_codepenMutations.js
import inputReducer from './_inputReducer';

export default function(input, inCollection, newValues = {}) {
  const args = inputReducer(input);
  const errorStr = (err = {}) => `dataSource interface error: ${err}`;

  return {
    create() {
      const response = inCollection.createNew(args);
      return {
        successStatus: !!response,
        updatedCodePen: response || null,
        message: response ? `updatedArticle: ${response._id}` : errorStr(),
      };
    },
  };
}

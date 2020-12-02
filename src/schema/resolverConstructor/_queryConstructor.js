// ./src/schema/resolverConstructor/_queryConstructor.js
import inputReducer from './_inputReducer';

export default function(input, inCollection) {
  return {
    getTutorials() {
      const args = inputReducer(input);
      return inCollection.getAll(args);
    },
  };
}

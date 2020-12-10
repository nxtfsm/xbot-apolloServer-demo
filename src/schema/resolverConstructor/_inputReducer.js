// ./src/schema/resolverConstructor/_inputReducer.js
export default function(input) {
  const args = {};

  Object.entries(input).map(([key, value]) => {
    if (value && key !== 'collectionName') {
      args[key] = value;
    }
  });

  return args;
}

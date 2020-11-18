// ./src/schema/resolvers/__inputConstructor.js
export default function(input) {
  const args = {};

  Object.entries(input).map(([key, value]) => {
    if (value && key !== 'internalOrigin') {
      args[key] = value;
    }
  });

  return args;
}

// ./src/schema/resolverConstructor/_queryConstructor.js
import inputReducer from './_inputReducer';

export default query;

function query({ articleQuery, pageSize = 10, after = 0 }, collection) {
  return {
    async getTutorials() {
      const args = inputReducer(articleQuery);
      const opts = { limit: pageSize, skip: after };
      const newCursor = pageSize + after - 1;
      const results = await collection.getAll(args, opts);

      results.hasMore = !!(newCursor < results.estCount);
      results.cursor = results.hasMore ? newCursor : results.estCount;

      return results;
    },
  };
};

// ./src/schema/resolverConstructor/_queryConstructor.js
import inputReducer from './_inputReducer';

export default tutorialsQuery;

function tutorialsQuery({
  articleQuery, pageSize = 10, after = 0,
}, inCollection) {
  return {
    async getTutorials() {
      const args = inputReducer(articleQuery);
      const opts = { pageSize, after };
      const newCursor = pageSize + after - 1;
      const results = await inCollection.getAll(args, opts);

      results.hasMore = !!(newCursor < results.estCount);
      results.cursor = results.hasMore ? newCursor : results.estCount;

      return results;
    },
  };
}

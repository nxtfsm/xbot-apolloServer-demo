// ./src/schema/resolvers/_queryConstructor.js
import inputConstructor from './_inputConstructor';

export async function queryTutorialsConstructor(input, dataSources) {
  const args = await inputConstructor(input);
  dataSources.inCollection = input.internalOrigin
    ? dataSources.internalArticles
    : dataSources.externalArticles;
  return {
    args,
    collection: input.internalOrigin ? 'internal' : 'external',
    query: () => dataSources.inCollection.getAll(args),
  };
}

export async function queryActiveUserConstructor(input, dataSources) {
  const query = { atXavierAccount: input.atXavierAccount };
  const userRecord = await inputConstructor(input);
  return () => dataSources.users.findActive(query, userRecord);
}

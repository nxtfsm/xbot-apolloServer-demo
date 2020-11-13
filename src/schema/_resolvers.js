// ./src/schema/_resolvers.js
export default {
  Query: {
    internalTutorials: async (_, args={ title, contents, postedBy },
      { dataSources }) => {
        const query = await queryConstructor(args)
        return dataSources.internalArticles.getAll(query, {})
      },
    externalTutorials: async (_, args={ title, contents, postedBy },
      { dataSources }) => {
        const query = await queryConstructor(args)
        return dataSources.externalArticles.getAll({}, {})
      },
    activeUser: (_, { atXavierAccount }, { dataSources }) => {
        const query = { atXavierAccount: atXavierAccount }
        return dataSources.users.findActive(query, {})
    }
  }
}

function queryConstructor(args) {
  const query = {};

  Object.entries(args).map(([key, value]) => {
    if (value) {
      query[key] = value
    }
  });

  return query
}

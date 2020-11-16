// ./src/schema/_resolvers.js
export default {
  Query: {
    internalTutorials: async (_, args={ title, contents, postedBy },
      { dataSources }) => {
        const doc = await docConstructor(args)
        return dataSources.internalArticles.getAll(doc, {})
      },
    externalTutorials: async (_, args={ title, contents, postedBy },
      { dataSources }) => {
        const doc = await docConstructor(args)
        return dataSources.externalArticles.getAll(doc, {})
      },
    activeUser: (_, { atXavierAccount }, { dataSources }) => {
        const query = { atXavierAccount: atXavierAccount }
        return dataSources.users.findActive(query, {})
    }
  },
  Mutation: {
    createTutorial: async (origin, args={
      internalOrigin, title, externalUrl, content, summary, postedBy
    }, {dataSources}) => {
      const doc = await docConstructor(args);
      if (args.internalOrigin) {
        return dataSources.internalArticles.createNew(doc, {})
                .then((result) => result)
                .catch((result) => null)
        } else {
        return dataSources.externalArticles.createNew(doc, {})
                .then((result) => result)
                .catch((result) => null)
        }
    }
  }
}

function docConstructor(args) {
  console.log(args)
  const docArgs = {};

  Object.entries(args).map(([key, value]) => {
    if (value && key !== 'internalOrigin') {
      docArgs[key] = value
    }
  });

  return docArgs
}

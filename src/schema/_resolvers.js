// ./src/schema/_resolvers.js
export default {
  Query: {
    internal: (_, __, { dataSources }) => {
      return dataSources.internalArticles.getAll({}, {limit: 100})
    },
    external: (_, __, { dataSources }) => {
      return dataSources.externalArticles.getAll({}, {limit: 100})
    },
    activeUser: (_, __, { dataSources }) => {
      return dataSources.users.getAll({}, {limit: 100})
    }
  }
}

// ./src/schema/_resolvers.js
export default {
  Query: {
    internal: () => {
      return console.log('in internal')
    },
    external: () => {
      return console.log('in external')
    },
    activeUser: () => {
      return console.log('in users')
    }
  }
}

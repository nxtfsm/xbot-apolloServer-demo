// ./src/dataSources/index.js
import Users from './_Users';
import External from './_External';
import Internal from './_Internal';

export default (database) => ({
  users: new Users(database.collection('users')),
  externalArticles: new External(database.collection('externalTutorials')),
  internalArticles: new Internal(database.collection('internalTutorials'))
})

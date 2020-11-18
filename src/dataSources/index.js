// ./src/dataSources/index.js
import Users from './_Users';
import Articles from './_Articles';

export default (database) => ({
  users: new Users(database.collection('users')),
  externalArticles: new Articles(database.collection('externalTutorials')),
  internalArticles: new Articles(database.collection('internalTutorials')),
});

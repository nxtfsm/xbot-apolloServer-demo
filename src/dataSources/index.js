// ./src/dataSources/index.js
import Articles from './_Articles';
import CodePens from './_CodePens';
import Users from './_Users';

export default (database) => ({
  codePens: new CodePens(database.collection('codePens')),
  externalTutorials: new Articles(database.collection('externalTutorials')),
  internalTutorials: new Articles(database.collection('internalTutorials')),
  users: new Users(database.collection('users')),
});

// ./index.js
import 'dotenv/config';
import Server, { launchExpress, authApplication } from './src';

const config = {
  port: process.env.PORT,
  remoteURI: process.env.MONGODB_URI,
  debugging: process.env.NODE_ENV === 'debugging' ? true : null,
  testId: process.env.TEST_AUTH_ID,
  testSecret: process.env.TEST_AUTH_SECRET,
};

const app = launchExpress(config.port);

Server(app, config);

authApplication(config.testId, config.testSecret);

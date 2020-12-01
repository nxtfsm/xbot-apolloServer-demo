// ./index.js
import 'dotenv/config';
import Server, { launchExpress } from './src';

const config = {
  port: process.env.PORT,
  remoteURI: process.env.MONGODB_URI,
  debugging: process.env.NODE_ENV === 'debugging' ? true : null,
};

const app = launchExpress(config.port);

Server(app, config);

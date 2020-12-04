// ./index.js
import 'dotenv/config';
import Server from './src';
import { launchExpress } from './src/middleware';

const config = {
  port: process.env.PORT,
  remoteURI: process.env.MONGODB_URI,
  debugging: process.env.NODE_ENV === 'debugging' ? true : null,
};

const app = launchExpress(config.port);

Server(app, config);

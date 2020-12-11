// ./index.js
import 'dotenv/config';
import Server from './src';
import { launchExpress } from './src/middleware';

const config = {
  ...process.env,
  debugging: process.env.NODE_ENV === 'debugging' ? true : null,
  URL: `${process.env.BASE_URL}:${process.env.PORT}`,
};

const app = launchExpress(config.PORT);

Server(app, config);

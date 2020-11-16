// ./index.js
import 'dotenv/config';
import Server from './src';

Server({
  port: process.env.PORT,
  remoteURI: process.env.MONGODB_URI,
  debugging: process.env.NODE_ENV === "debugging" ? true : null
})

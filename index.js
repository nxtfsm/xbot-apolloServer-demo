// ./index.js
import 'dotenv/config';
import Server from './src';

Server({
  remoteURI: process.env.MONGODB_URI,
  onPort: process.env.PORT,
  debugging: process.env.NODE_ENV
})

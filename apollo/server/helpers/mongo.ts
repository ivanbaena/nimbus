import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import { MONGO_URI } from './';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
// possibly deprecated
// mongoose.Promise = global.Promise;

// mongoose instance
export const instance = mongoose;

// Connect to the mongoDB instance and log a message
// on success or failure
instance.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
instance.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error));

export const MongoStore = connectMongo(session);

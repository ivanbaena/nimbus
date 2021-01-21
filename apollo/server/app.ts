import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './services/passportConfig';
import { MongoStore, instance as mongoose } from './helpers';

export const app = express();

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    name: 'auth',
    secret: 'qwertyasdfg',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      autoReconnect: true,
      collection: 'sessions',
    }),
    cookie: {
      secure: false,
      maxAge: 1000 * 30,
    },
  })
);

// Set headers to notify server that will allow our graphql api
// to handle incoming request from different origins
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

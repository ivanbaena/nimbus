import passport from 'passport';
import { user as User } from '../../models';

// Creates a new user account.  We first check to see if a user already exists
// with this email address to avoid making multiple accounts with identical addresses
// If it does not, we save the existing user.  After the user is created, it is
// provided to the 'req.logIn' function.  This is apart of Passport JS.
// Notice the Promise created in the second 'then' statement.  This is done
// because Passport only supports callbacks, while GraphQL only supports promises
// for async code!  Awkward!
export function signup({ email, username, password, req }: any) {
  const user = new User({ email, username, password });
  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('Email in use');
      }
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.login(user, (err: Error) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
}

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its indended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
export function login({ email, password, req }: any) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        const err = new Error('Invalid credentials.');
        reject(err);
      }
      req.logIn(user, () => {
        resolve(user);
      });
    })({ body: { email, password } });
  });
}

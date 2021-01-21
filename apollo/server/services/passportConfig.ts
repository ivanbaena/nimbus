import PassportLocal from 'passport-local';
import { UserInterFace } from '../../models';
import { user as User } from '../../models';

export default (passport: any) => {
  const LocalStrategy = PassportLocal.Strategy;
  // SerializeUser is used to provide some identifying token that can be saved
  // in the users session.  We traditionally use the 'ID' for this.
  passport.serializeUser((user: UserInterFace, done: Function) => {
    done(null, user._id);
  });

  // The counterpart of 'serializeUser'.  Given only a user's ID, we must return
  // the user object.  This object is placed on 'req.user'.
  passport.deserializeUser((_id: String, done: Function) => {
    User.findById(_id, (err: Error, user: UserInterFace) => {
      if (err) {
        done(null, false, { error: err });
      } else {
        done(null, user);
      }
    });
  });

  // Instructs Passport how to authenticate a user using a locally saved email
  // and password combination.  This strategy is called whenever a user attempts to
  // log in.  We first find the user model in MongoDB that matches the submitted email,
  // then check to see if the provided password matches the saved password. There
  // are two obvious failure points here: the email might not exist in our DB or
  // the password might not match the saved one.  In either case, we call the 'done'
  // callback, including a string that messages why the authentication process failed.
  // This string is provided back to the GraphQL client.
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      (email: String, password: String, done: Function) => {
        User.findOne({ email: email.toLowerCase() }, (err: any, user: any) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, 'Invalid Credentials');
          }
          user.comparePassword(password, (err: Error, isMatch: Boolean) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, 'Invalid credentials.');
          });
        });
      }
    )
  );
};

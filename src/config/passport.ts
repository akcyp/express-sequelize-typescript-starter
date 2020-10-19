import passport from 'passport';
import * as PassportLocal from 'passport-local';

import User from '../models/User';

passport.use('local', new PassportLocal.Strategy(async function(username, password, done) {
  try {
    const user = await User.findOne({
      where: {
        username: username
      }
    });
    if (!user) {
      return done(null, false, { message: 'Invalid username or password!' });
    }
    if (!(await user.verifyPassword(password))) {
      return done(null, false, { message: 'Invalid username or password!' });
    }
    return done(null, user);
  } catch (err) {
    done(err, false, { message: err.message });
  }
}));

passport.use('local-signup', new PassportLocal.Strategy(async function(username, password, done) {
  try {
    const oldUser = await User.findOne({
      where: {
        username: username
      }
    });
    if (oldUser) {
      return done(null, false, { message: 'This username is already taken!' });
    }
    const user = new User({
      username,
      password
    });
    await user.save();
    return done(null, user);
  } catch (err) {
    done(err, false, { message: err.message});
  }
}));

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});
passport.deserializeUser((id: number, done) => {
  User.findByPk(id, {
    include: {
      all: true
    }
  }).then(user => {
    done(null, user);
  }).catch(err => {
    done(err, null);
  });
});

export default passport;

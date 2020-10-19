import express from 'express';
import expressSession from 'express-session';
import flash from 'connect-flash';
import path from 'path';

import { sessionStore } from '../database';

import passport from '../config/passport';
import routes from '../routes';

const app = express();

// Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../src/views'));
app.set('trust proxy', 1);
app.disable('x-powered-by')

// Parse post requests
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Init session
app.use(expressSession({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());

// Init routing
app.use(routes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT} in ${app.get('env')} mode`);
});

export default app;
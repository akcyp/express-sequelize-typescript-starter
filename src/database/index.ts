import expressSession from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import connection from './connection';

import * as models from '../models'

const SequelizeStore = connectSessionSequelize(expressSession.Store);
const sessionStore = new SequelizeStore({
  db: connection
});
sessionStore.sync();
connection.sync();

export {
  sessionStore,
  connection,
  models
};

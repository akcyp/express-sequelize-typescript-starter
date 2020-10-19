const default_node_env = 'development';

import path from 'path';
import dotEnv from 'dotenv-flow';
dotEnv.config({
  default_node_env: default_node_env,
  path: path.join(__dirname, '..')
});
process.env.NODE_ENV = process.env.NODE_ENV || default_node_env;

import app from './server';

// place for optional connecting your app to other services like websockets
// ...

export default app;

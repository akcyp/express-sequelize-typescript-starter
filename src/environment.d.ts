declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      HOST: string;
      DATABASE_URL: string;
      PORT?: string;
      SESSION_SECRET: string;
    }
  }
  namespace Express {
    export interface Request {
      user: import('./models/User').default;
    }
  }
}
export {};

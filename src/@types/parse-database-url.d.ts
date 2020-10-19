declare module 'parse-database-url' {
  interface DbConfig {
    driver: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
    host?: string;
    port?: string;
    user?: string;
    password?: string;
    database?: string;
    filename?: string;
  }
  export default function (url: string): DbConfig;
}

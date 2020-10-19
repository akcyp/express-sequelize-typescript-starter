import { Sequelize } from 'sequelize';
import parseDbUrl from 'parse-database-url';

const dbConfig = parseDbUrl(process.env.DATABASE_URL!);

const connection = new Sequelize(dbConfig.database!, dbConfig.user!, dbConfig.password, {
    logging: false,
    host: dbConfig.host,
    dialect: dbConfig.driver
});

export default connection;

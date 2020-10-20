declare module 'connect-session-sequelize' {
	import {Store} from 'express-session';
	import * as Sequelize from 'sequelize';
	interface DefaultFields {
		data: string;
		expires: Date;
	}
	interface Data {
		[column: string]: any;
	}
	interface SequelizeStoreOptions {
		db: Sequelize.Sequelize;
		table?: Sequelize.Model<any, any>;
		extendDefaultFields?: (defaults: DefaultFields, session: any) => Data;
		checkExpirationInterval?: number;
		expiration?: number;
	}
	class SequelizeStore extends Store {
		public sync(): void;
		public touch(sid: string, data: any, callback?: (err: any) => void): void;
	}
	type SequelizeStoreConstructor = new(options: SequelizeStoreOptions) => SequelizeStore;
	export default function init(store: typeof Store): SequelizeStoreConstructor;
}

import knex from 'knex';
import dotenv from 'dotenv';
import camelCase from 'camelcase';

import SchemaInspector from '../knex-schema-inspector/lib/index';

dotenv.config();

const connectionConfig: Record<string, any> = {};

for (let [key, value] of Object.entries(process.env)) {
	key = key.toLowerCase();
	if (key.startsWith('db') === false) continue;
	if (key === 'db_client') continue;

	connectionConfig[camelCase(key)] = value;
}

const database = knex({
	client: process.env.DB_CLIENT,
	connection: connectionConfig,
	migrations: {
		extension: 'ts',
		directory: './src/database/migrations',
	},
	seeds: {
		extension: 'ts',
		directory: './src/database/seeds/',
	},
});

export const schemaInspector = SchemaInspector(database);

export default database;

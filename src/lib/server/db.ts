import { env } from '$env/dynamic/private';
import { createClient } from '@libsql/client';

function requireTursoConfig() {
	const databaseUrl = env.TURSO_DATABASE_URL;
	const authToken = env.TURSO_AUTH_TOKEN;

	if (!databaseUrl) {
		throw new Error('TURSO_DATABASE_URL não configurada no servidor. Defina a variável de ambiente antes de usar a API de cards.');
	}

	if (!authToken) {
		throw new Error('TURSO_AUTH_TOKEN não configurada no servidor. Defina a variável de ambiente antes de usar a API de cards.');
	}

	return { databaseUrl, authToken };
}

let client: ReturnType<typeof createClient> | null = null;

function getClient() {
	if (!client) {
		const { databaseUrl, authToken } = requireTursoConfig();
		client = createClient({
			url: databaseUrl,
			authToken
		});
	}

	return client;
}

export const db = {
	execute: (...args: Parameters<ReturnType<typeof createClient>['execute']>) => getClient().execute(...args),
	batch: (...args: Parameters<ReturnType<typeof createClient>['batch']>) => getClient().batch(...args)
};

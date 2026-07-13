declare module '@libsql/client' {
	type Value = string | number | bigint | boolean | Uint8Array | null;
	type InArgs = Value[] | Record<string, Value>;
	type Statement = string | { sql: string; args?: InArgs };
	type TransactionMode = 'write' | 'read' | 'deferred' | 'immediate';

	type ResultSet = {
		rows: unknown[];
	};

	type Client = {
		execute(statement: Statement): Promise<ResultSet>;
		batch(statements: Statement[], mode?: TransactionMode): Promise<ResultSet[]>;
	};

	export function createClient(config: { url: string; authToken?: string }): Client;
}

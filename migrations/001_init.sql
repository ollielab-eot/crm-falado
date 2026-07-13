CREATE TABLE IF NOT EXISTS cards (
	id TEXT PRIMARY KEY,
	empresa TEXT,
	pessoa TEXT,
	cargo TEXT,
	prioridade TEXT,
	score INTEGER,
	etapa_funil TEXT,
	resumo_curto TEXT,
	resumo_completo TEXT,
	oportunidade TEXT,
	objecao TEXT,
	proxima_acao TEXT,
	texto_original TEXT,
	source TEXT,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS card_tags (
	card_id TEXT NOT NULL,
	tag TEXT NOT NULL,
	PRIMARY KEY (card_id, tag),
	FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS card_history (
	id TEXT PRIMARY KEY,
	card_id TEXT NOT NULL,
	texto TEXT NOT NULL,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

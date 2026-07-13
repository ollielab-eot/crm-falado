import { db } from '$lib/server/db';
import type { CRMCard, FunnelStage, Priority } from '$lib/types';

type CardRow = {
	id: string;
	empresa: string | null;
	pessoa: string | null;
	cargo: string | null;
	prioridade: string | null;
	score: number | null;
	etapa_funil: string | null;
	resumo_curto: string | null;
	resumo_completo: string | null;
	oportunidade: string | null;
	objecao: string | null;
	proxima_acao: string | null;
};

type RelatedTextRow = {
	card_id: string;
	texto?: string;
	tag?: string;
};

type StoredCRMCard = CRMCard & {
	texto_original?: string;
	source?: string;
};

function createCardId(prefix = 'turso') {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function rowToCard(row: CardRow, tags: string[], historico: string[]): CRMCard {
	return {
		id: row.id,
		empresa: row.empresa ?? '',
		pessoa: row.pessoa ?? '',
		cargo: row.cargo ?? '',
		prioridade: (row.prioridade ?? 'media') as Priority,
		score: row.score ?? 0,
		etapa_funil: (row.etapa_funil ?? 'Novo contato') as FunnelStage,
		resumo_curto: row.resumo_curto ?? '',
		resumo_completo: row.resumo_completo ?? '',
		oportunidade: row.oportunidade ?? '',
		objecao: row.objecao ?? '',
		proxima_acao: row.proxima_acao ?? '',
		tags,
		historico
	};
}

export async function getCards(): Promise<CRMCard[]> {
	const cardsResult = await db.execute('SELECT * FROM cards ORDER BY created_at DESC');
	const tagResult = await db.execute('SELECT card_id, tag FROM card_tags ORDER BY tag ASC');
	const historyResult = await db.execute('SELECT card_id, texto FROM card_history ORDER BY created_at ASC');

	const tagsByCard = new Map<string, string[]>();
	for (const row of tagResult.rows as RelatedTextRow[]) {
		if (!row.tag) continue;
		tagsByCard.set(row.card_id, [...(tagsByCard.get(row.card_id) ?? []), row.tag]);
	}

	const historyByCard = new Map<string, string[]>();
	for (const row of historyResult.rows as RelatedTextRow[]) {
		if (!row.texto) continue;
		historyByCard.set(row.card_id, [...(historyByCard.get(row.card_id) ?? []), row.texto]);
	}

	return (cardsResult.rows as CardRow[]).map((row) =>
		rowToCard(row, tagsByCard.get(row.id) ?? [], historyByCard.get(row.id) ?? [])
	);
}

export async function addCard(card: CRMCard): Promise<CRMCard> {
	const cardToAdd: StoredCRMCard = {
		...card,
		id: card.id || createCardId(),
		tags: card.tags ?? [],
		historico: card.historico ?? [],
		source: 'turso'
	};

	await db.batch(
		[
			{
				sql: `INSERT INTO cards (
					id, empresa, pessoa, cargo, prioridade, score, etapa_funil, resumo_curto,
					resumo_completo, oportunidade, objecao, proxima_acao, texto_original, source, updated_at
				) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
				ON CONFLICT(id) DO UPDATE SET
					empresa = excluded.empresa,
					pessoa = excluded.pessoa,
					cargo = excluded.cargo,
					prioridade = excluded.prioridade,
					score = excluded.score,
					etapa_funil = excluded.etapa_funil,
					resumo_curto = excluded.resumo_curto,
					resumo_completo = excluded.resumo_completo,
					oportunidade = excluded.oportunidade,
					objecao = excluded.objecao,
					proxima_acao = excluded.proxima_acao,
					texto_original = excluded.texto_original,
					source = excluded.source,
					updated_at = CURRENT_TIMESTAMP`,
				args: [
					cardToAdd.id,
					cardToAdd.empresa,
					cardToAdd.pessoa,
					cardToAdd.cargo,
					cardToAdd.prioridade,
					cardToAdd.score,
					cardToAdd.etapa_funil,
					cardToAdd.resumo_curto,
					cardToAdd.resumo_completo,
					cardToAdd.oportunidade,
					cardToAdd.objecao,
					cardToAdd.proxima_acao,
					cardToAdd.texto_original ?? '',
					cardToAdd.source ?? 'turso'
				]
			},
			{ sql: 'DELETE FROM card_tags WHERE card_id = ?', args: [cardToAdd.id] },
			{ sql: 'DELETE FROM card_history WHERE card_id = ?', args: [cardToAdd.id] },
			...cardToAdd.tags.map((tag) => ({ sql: 'INSERT INTO card_tags (card_id, tag) VALUES (?, ?)', args: [cardToAdd.id, tag] })),
			...cardToAdd.historico.map((texto) => ({
				sql: 'INSERT INTO card_history (id, card_id, texto) VALUES (?, ?, ?)',
				args: [createCardId('history'), cardToAdd.id, texto]
			}))
		],
		'write'
	);

	return cardToAdd;
}

export async function deleteCard(id: string): Promise<void> {
	await db.execute({ sql: 'DELETE FROM cards WHERE id = ?', args: [id] });
}

export async function clearCards(): Promise<void> {
	await db.batch(['DELETE FROM card_history', 'DELETE FROM card_tags', 'DELETE FROM cards'], 'write');
}

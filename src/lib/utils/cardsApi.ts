import type { CRMCard } from '$lib/types';

type CardsResponse = {
	cards: CRMCard[];
};

type CardResponse = {
	card: CRMCard;
};

async function parseJsonResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new Error('Falha ao acessar a API experimental de cards.');
	}

	return (await response.json()) as T;
}

export async function fetchApiCards(): Promise<CRMCard[]> {
	const data = await parseJsonResponse<CardsResponse>(await fetch('/api/cards'));

	return data.cards;
}

export async function createApiCard(card: CRMCard): Promise<CRMCard> {
	const data = await parseJsonResponse<CardResponse>(
		await fetch('/api/cards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(card)
		})
	);

	return data.card;
}

export async function deleteApiCard(id: string): Promise<void> {
	await parseJsonResponse<{ ok: true }>(await fetch(`/api/cards?id=${encodeURIComponent(id)}`, { method: 'DELETE' }));
}

export async function clearApiCards(): Promise<void> {
	await parseJsonResponse<{ ok: true }>(await fetch('/api/cards', { method: 'DELETE' }));
}

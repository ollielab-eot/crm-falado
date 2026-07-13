import { json, type RequestHandler } from '@sveltejs/kit';
import { addCard, clearCards, deleteCard, getCards } from '$lib/server/cardsRepository';
import type { CRMCard } from '$lib/types';

export const GET: RequestHandler = async () => {
	return json({ cards: await getCards() });
};

export const POST: RequestHandler = async ({ request }) => {
	const card = (await request.json()) as CRMCard;

	return json({ card: await addCard(card) });
};

export const DELETE: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');

	if (id) {
		await deleteCard(id);
	} else {
		await clearCards();
	}

	return json({ ok: true });
};

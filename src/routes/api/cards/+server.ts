import { json, type RequestHandler } from '@sveltejs/kit';
import { addCard, clearCards, deleteCard, getCards } from '$lib/server/cardsStore';
import type { CRMCard } from '$lib/types';

export const GET: RequestHandler = () => {
	return json({ cards: getCards() });
};

export const POST: RequestHandler = async ({ request }) => {
	const card = (await request.json()) as CRMCard;

	return json({ card: addCard(card) });
};

export const DELETE: RequestHandler = ({ url }) => {
	const id = url.searchParams.get('id');

	if (id) {
		deleteCard(id);
	} else {
		clearCards();
	}

	return json({ ok: true });
};

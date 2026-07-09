import { browser } from '$app/environment';
import type { CRMCard } from '$lib/types';

const STORAGE_KEY = 'crm-falado:saved-cards';

function createCardId() {
	if (browser && typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return `local-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readCardsFromStorage(): CRMCard[] {
	if (!browser) {
		return [];
	}

	const rawCards = localStorage.getItem(STORAGE_KEY);

	if (!rawCards) {
		return [];
	}

	try {
		const parsedCards = JSON.parse(rawCards);
		return Array.isArray(parsedCards) ? (parsedCards as CRMCard[]) : [];
	} catch {
		return [];
	}
}

function writeCardsToStorage(cards: CRMCard[]) {
	if (!browser) {
		return;
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function getSavedCards(): CRMCard[] {
	return readCardsFromStorage();
}

export function saveCard(card: CRMCard): void {
	const cardToSave: CRMCard = {
		...card,
		id: card.id || createCardId()
	};
	const cards = readCardsFromStorage();

	writeCardsToStorage([cardToSave, ...cards.filter((savedCard) => savedCard.id !== cardToSave.id)]);
}

export function deleteSavedCard(cardId: string): void {
	writeCardsToStorage(readCardsFromStorage().filter((card) => card.id !== cardId));
}

export function clearSavedCards(): void {
	writeCardsToStorage([]);
}

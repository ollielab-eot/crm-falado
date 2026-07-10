import type { CRMCard } from '$lib/types';

// Store em memória temporária para a Sprint 5; será substituída por Turso na próxima sprint.
let cards: CRMCard[] = [];

function createCardId() {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return `api-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getCards(): CRMCard[] {
	return cards;
}

export function addCard(card: CRMCard): CRMCard {
	const cardToAdd: CRMCard = {
		...card,
		id: card.id || createCardId()
	};

	cards = [cardToAdd, ...cards.filter((storedCard) => storedCard.id !== cardToAdd.id)];

	return cardToAdd;
}

export function deleteCard(id: string): void {
	cards = cards.filter((card) => card.id !== id);
}

export function clearCards(): void {
	cards = [];
}

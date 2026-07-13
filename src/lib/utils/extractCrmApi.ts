import type { CRMCard } from '$lib/types';

type ExtractCrmResponse = {
	card: CRMCard;
};

export async function extractCrmWithAI(text: string): Promise<CRMCard> {
	const response = await fetch('/api/extract-crm', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text })
	});

	if (!response.ok) {
		const data = (await response.json().catch(() => ({}))) as { message?: string };
		throw new Error(data.message ?? 'Não foi possível gerar o card com IA.');
	}

	const data = (await response.json()) as ExtractCrmResponse;

	return data.card;
}

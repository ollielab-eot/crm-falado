import { json, type RequestHandler } from '@sveltejs/kit';
import { aiExtractCRM } from '$lib/server/aiExtractCRM';

export const POST: RequestHandler = async ({ request }) => {
	let payload: { text?: unknown };

	try {
		payload = (await request.json()) as { text?: unknown };
	} catch {
		return json({ message: 'Envie um JSON válido com o campo text.' }, { status: 400 });
	}

	if (typeof payload.text !== 'string' || !payload.text.trim()) {
		return json({ message: 'Informe um texto comercial para gerar o card.' }, { status: 400 });
	}

	try {
		return json({ card: await aiExtractCRM(payload.text) });
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Não foi possível gerar o card com IA.';
		const status = message.includes('OPENAI_API_KEY') ? 503 : 502;

		return json(
			{ message: 'IA indisponível no momento. Gere o preview com regra local.', detail: message },
			{ status }
		);
	}
};

import { json, type RequestHandler } from '@sveltejs/kit';
import { transcribeAudio } from '$lib/server/transcribeAudio';

const ACCEPTED_AUDIO_TYPES = new Set([
	'audio/mpeg',
	'audio/mp3',
	'audio/wav',
	'audio/x-wav',
	'audio/webm',
	'audio/mp4',
	'audio/m4a',
	'audio/x-m4a'
]);

const MAX_AUDIO_SIZE_BYTES = 20 * 1024 * 1024;

export const POST: RequestHandler = async ({ request }) => {
	let formData: FormData;

	try {
		formData = await request.formData();
	} catch {
		return json({ message: 'Envie um FormData válido com o campo audio.' }, { status: 400 });
	}

	const audio = formData.get('audio');

	if (!(audio instanceof File)) {
		return json({ message: 'Selecione um arquivo de áudio para transcrever.' }, { status: 400 });
	}

	if (!ACCEPTED_AUDIO_TYPES.has(audio.type)) {
		return json(
			{ message: 'Formato de áudio não suportado. Envie mp3, wav, m4a, webm ou mp4.' },
			{ status: 415 }
		);
	}

	if (audio.size > MAX_AUDIO_SIZE_BYTES) {
		return json({ message: 'O arquivo de áudio deve ter no máximo 20 MB.' }, { status: 413 });
	}

	try {
		return json({ text: await transcribeAudio(audio) });
	} catch (error) {
		const detail = error instanceof Error ? error.message : 'Não foi possível transcrever o áudio.';
		const status = detail.includes('OPENAI_API_KEY') ? 503 : 502;

		return json(
			{ message: 'Transcrição indisponível no momento. Tente novamente em instantes.', detail },
			{ status }
		);
	}
};

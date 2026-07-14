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
	'audio/x-m4a',
	'video/mp4'
]);

const ACCEPTED_AUDIO_EXTENSIONS = new Set(['.mp3', '.wav', '.m4a', '.webm', '.mp4']);
const MAX_AUDIO_SIZE_BYTES = 20 * 1024 * 1024;

function getFileExtension(fileName: string) {
	const extensionStart = fileName.lastIndexOf('.');

	if (extensionStart < 0) {
		return '';
	}

	return fileName.slice(extensionStart).toLowerCase();
}

function getDetectedFormatMessage(file: File) {
	const detectedType = file.type || 'MIME vazio';
	const detectedExtension = getFileExtension(file.name) || 'sem extensão';

	return `Formato detectado: ${detectedType}, extensão ${detectedExtension}. Tente mp3, wav, m4a, webm ou mp4.`;
}

function isAcceptedAudioFile(file: File) {
	const extension = getFileExtension(file.name);
	const hasAcceptedType = ACCEPTED_AUDIO_TYPES.has(file.type);
	const hasAcceptedExtension = ACCEPTED_AUDIO_EXTENSIONS.has(extension);
	const hasLooseType = !file.type || file.type === 'application/octet-stream';

	return hasAcceptedType || (hasLooseType && hasAcceptedExtension);
}

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

	console.info('Arquivo recebido para transcrição', {
		name: audio.name,
		type: audio.type,
		size: audio.size
	});

	if (!isAcceptedAudioFile(audio)) {
		return json(
			{
				message: `Formato de áudio não suportado. ${getDetectedFormatMessage(audio)}`,
				file: {
					name: audio.name,
					type: audio.type,
					size: audio.size
				}
			},
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

		console.error('Erro ao transcrever áudio com OpenAI', {
			file: {
				name: audio.name,
				type: audio.type,
				size: audio.size
			},
			error
		});

		return json(
			{ message: 'Transcrição indisponível no momento. Tente novamente em instantes.' },
			{ status }
		);
	}
};

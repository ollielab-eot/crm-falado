import OpenAI, { toFile } from 'openai';
import { env } from '$env/dynamic/private';

const PRIMARY_TRANSCRIPTION_MODEL = 'gpt-4o-mini-transcribe';
const FALLBACK_TRANSCRIPTION_MODEL = 'whisper-1';

async function createUploadableAudioFile(file: File) {
	const bytes = new Uint8Array(await file.arrayBuffer());

	return toFile(bytes, file.name || 'audio-upload', {
		type: file.type || 'application/octet-stream'
	});
}

export async function transcribeAudio(file: File): Promise<string> {
	if (!env.OPENAI_API_KEY) {
		throw new Error('OPENAI_API_KEY não configurada.');
	}

	const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
	const uploadableFile = await createUploadableAudioFile(file);

	try {
		const transcription = await openai.audio.transcriptions.create({
			file: uploadableFile,
			model: PRIMARY_TRANSCRIPTION_MODEL
		});

		const text = transcription.text?.trim();

		if (!text) {
			throw new Error('A transcrição não retornou texto.');
		}

		return text;
	} catch (error) {
		console.warn('Falha ao transcrever com modelo principal. Tentando fallback whisper-1.', error);

		// Fallback mantido porque alguns ambientes/contas podem não ter o modelo mais novo de transcrição habilitado.
		const fallbackFile = await createUploadableAudioFile(file);
		const fallbackTranscription = await openai.audio.transcriptions.create({
			file: fallbackFile,
			model: FALLBACK_TRANSCRIPTION_MODEL
		});
		const fallbackText = fallbackTranscription.text?.trim();

		if (!fallbackText) {
			throw new Error('A transcrição não retornou texto.');
		}

		return fallbackText;
	}
}

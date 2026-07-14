import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

export async function transcribeAudio(file: File): Promise<string> {
	if (!env.OPENAI_API_KEY) {
		throw new Error('OPENAI_API_KEY não configurada.');
	}

	const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
	const transcription = await openai.audio.transcriptions.create({
		file,
		model: 'gpt-4o-mini-transcribe'
	});

	const text = transcription.text?.trim();

	if (!text) {
		throw new Error('A transcrição não retornou texto.');
	}

	return text;
}

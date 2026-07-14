type TranscribeResponse = {
	text: string;
};

export async function transcribeAudioFile(file: File): Promise<string> {
	const formData = new FormData();
	formData.append('audio', file);

	const response = await fetch('/api/transcribe', {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		const data = (await response.json().catch(() => ({}))) as { message?: string };
		throw new Error(data.message ?? 'Não foi possível transcrever o áudio.');
	}

	const data = (await response.json()) as TranscribeResponse;

	return data.text;
}

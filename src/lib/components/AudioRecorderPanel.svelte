<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { transcribeAudioFile } from '$lib/utils/transcribeApi';

	type Props = {
		onTranscribed: (text: string) => void;
		resetKey: number;
	};

	let props: Props = $props();
	let mediaRecorder = $state<MediaRecorder | null>(null);
	let stream = $state<MediaStream | null>(null);
	let audioChunks: BlobPart[] = [];
	let recordedFile = $state<File | null>(null);
	let audioUrl = $state('');
	let audioElement = $state<HTMLAudioElement | null>(null);
	let errorMessage = $state('');
	let isRecording = $state(false);
	let isTranscribing = $state(false);
	let durationSeconds = $state(0);
	let startedAt = 0;
	let durationTimer: ReturnType<typeof setInterval> | null = null;
	let lastResetKey = $state<number | null>(null);

	let recordingState = $derived(
		isTranscribing
			? 'Transcrevendo gravação...'
			: isRecording
				? 'Gravando...'
				: recordedFile
					? 'Gravação pronta'
					: 'Aguardando gravação'
	);

	$effect(() => {
		if (lastResetKey === null) {
			lastResetKey = props.resetKey;
			return;
		}

		if (props.resetKey !== lastResetKey) {
			clearRecording();
			lastResetKey = props.resetKey;
		}
	});

	function supportsRecording() {
		return browser && typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder !== 'undefined';
	}

	function createAudioFile(blob: Blob) {
		return new File([blob], `gravacao-crm-${Date.now()}.webm`, { type: blob.type || 'audio/webm' });
	}

	function clearTimer() {
		if (durationTimer) {
			clearInterval(durationTimer);
			durationTimer = null;
		}
	}

	function stopStream() {
		stream?.getTracks().forEach((track) => track.stop());
		stream = null;
	}

	function revokeAudioUrl() {
		if (audioUrl) {
			URL.revokeObjectURL(audioUrl);
			audioUrl = '';
		}
	}

	async function startRecording() {
		if (!supportsRecording()) {
			errorMessage = 'Seu navegador não suporta gravação de áudio neste fluxo.';
			return;
		}

		clearRecording();
		errorMessage = '';

		try {
			stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const recorderOptions = MediaRecorder.isTypeSupported('audio/webm') ? { mimeType: 'audio/webm' } : undefined;
			mediaRecorder = new MediaRecorder(stream, recorderOptions);
			audioChunks = [];

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunks.push(event.data);
				}
			};

			mediaRecorder.onstop = () => {
				const blob = new Blob(audioChunks, { type: mediaRecorder?.mimeType || 'audio/webm' });
				recordedFile = createAudioFile(blob);
				audioUrl = URL.createObjectURL(blob);
				mediaRecorder = null;
				stopStream();
			};

			mediaRecorder.start();
			isRecording = true;
			startedAt = Date.now();
			durationSeconds = 0;
			durationTimer = setInterval(() => {
				durationSeconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
			}, 1000);
		} catch {
			errorMessage = 'Não foi possível acessar o microfone. Verifique a permissão do navegador e tente novamente.';
			isRecording = false;
			clearTimer();
			stopStream();
		}
	}

	function playRecording() {
		audioElement?.play();
	}

	function stopRecording() {
		if (!mediaRecorder || mediaRecorder.state === 'inactive') {
			return;
		}

		isRecording = false;
		clearTimer();
		durationSeconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
		mediaRecorder.stop();
	}

	async function transcribeRecording() {
		if (!recordedFile) {
			return;
		}

		isTranscribing = true;
		errorMessage = '';

		try {
			props.onTranscribed(await transcribeAudioFile(recordedFile));
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Não foi possível transcrever a gravação.';
		} finally {
			isTranscribing = false;
		}
	}

	function clearRecording() {
		if (mediaRecorder && mediaRecorder.state !== 'inactive') {
			mediaRecorder.onstop = null;
			mediaRecorder.stop();
		}
		clearTimer();
		stopStream();
		revokeAudioUrl();
		mediaRecorder = null;
		audioChunks = [];
		recordedFile = null;
		errorMessage = '';
		isRecording = false;
		isTranscribing = false;
		durationSeconds = 0;
	}

	onDestroy(() => {
		clearRecording();
	});

	function formatDuration(seconds: number) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}
</script>

<section class="audio-recorder" aria-labelledby="audio-recorder-title">
	<div>
		<p class="section-label">Gravar áudio</p>
		<h2 id="audio-recorder-title">Grave uma nota de voz curta</h2>
		<p class="hint">Grave uma nota de voz curta. Depois transcreva e gere o card CRM.</p>
	</div>

	<div class="status-card" aria-live="polite">
		<strong>{recordingState}</strong>
		<span>Duração aproximada: {formatDuration(durationSeconds)}</span>
	</div>

	{#if audioUrl}
		<audio bind:this={audioElement} controls src={audioUrl}>Seu navegador não consegue reproduzir este áudio.</audio>
	{/if}

	<div class="audio-actions">
		<button type="button" onclick={startRecording} disabled={isRecording || isTranscribing}>Iniciar gravação</button>
		<button type="button" onclick={stopRecording} disabled={!isRecording}>Parar gravação</button>
		<button type="button" onclick={playRecording} disabled={!audioUrl}>Reproduzir áudio</button>
		<button type="button" onclick={transcribeRecording} disabled={!recordedFile || isRecording || isTranscribing}>
			{isTranscribing ? 'Transcrevendo gravação...' : 'Transcrever gravação'}
		</button>
		<button class="secondary" type="button" onclick={clearRecording} disabled={isRecording || isTranscribing || !recordedFile}>Limpar gravação</button>
	</div>

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
</section>

<style>
	.audio-recorder {
		display: grid;
		gap: 0.75rem;
		border: 1px solid rgba(74, 93, 142, 0.16);
		border-radius: 1.25rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.68);
	}

	.section-label {
		margin: 0 0 0.25rem;
		font-size: 0.78rem;
		font-weight: 900;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #4c63f2;
	}

	h2,
	.hint,
	.error {
		margin: 0;
	}

	h2 {
		font-size: 1.15rem;
		color: #22325f;
	}

	.hint,
	.status-card span {
		line-height: 1.5;
		color: #52627f;
	}

	.status-card {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
		border-radius: 1rem;
		padding: 0.85rem;
		background: #fff;
		color: #22325f;
	}

	audio {
		width: 100%;
	}

	.audio-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	button {
		border: 0;
		border-radius: 999px;
		padding: 0.85rem 1.1rem;
		background: #22325f;
		color: #fff;
		font: inherit;
		font-weight: 900;
		text-decoration: none;
		cursor: pointer;
	}

	.secondary {
		background: #ffffff;
		color: #22325f;
	}

	button:disabled {
		cursor: wait;
		opacity: 0.68;
		pointer-events: none;
	}

	.error {
		font-weight: 900;
		color: #b42318;
	}
</style>

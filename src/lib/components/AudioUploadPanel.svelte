<script lang="ts">
	import { transcribeAudioFile } from '$lib/utils/transcribeApi';

	type Props = {
		onTranscribed: (text: string) => void;
		resetKey: number;
	};

	let { onTranscribed, resetKey }: Props = $props();
	let selectedFile = $state<File | null>(null);
	let isTranscribing = $state(false);
	let errorMessage = $state('');
	let fileInput = $state<HTMLInputElement | null>(null);
	let lastResetKey = $state(resetKey);

	$effect(() => {
		if (resetKey !== lastResetKey) {
			selectedFile = null;
			isTranscribing = false;
			errorMessage = '';
			lastResetKey = resetKey;

			if (fileInput) {
				fileInput.value = '';
			}
		}
	});

	function formatFileSize(size: number) {
		const megabytes = size / 1024 / 1024;

		if (megabytes >= 1) {
			return `${megabytes.toFixed(1)} MB`;
		}

		return `${Math.max(1, Math.round(size / 1024))} KB`;
	}

	function handleFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		selectedFile = input.files?.[0] ?? null;
		errorMessage = '';
	}

	async function handleTranscribe() {
		if (!selectedFile) {
			return;
		}

		isTranscribing = true;
		errorMessage = '';

		try {
			onTranscribed(await transcribeAudioFile(selectedFile));
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Não foi possível transcrever o áudio.';
		} finally {
			isTranscribing = false;
		}
	}
</script>

<section class="audio-upload" aria-labelledby="audio-upload-title">
	<div>
		<p class="section-label">Enviar áudio</p>
		<h2 id="audio-upload-title">Transcrever conversa gravada</h2>
		<p class="hint">Envie um áudio curto em mp3, wav, m4a, webm ou mp4. O texto transcrito preencherá o campo abaixo.</p>
	</div>

	<label class="file-label" for="audio-file">Arquivo de áudio</label>
	<input
		id="audio-file"
		bind:this={fileInput}
		type="file"
		accept=".mp3,.wav,.m4a,.webm,.mp4"
		onchange={handleFileChange}
	/>

	{#if selectedFile}
		<p class="file-info">Selecionado: <strong>{selectedFile.name}</strong> ({formatFileSize(selectedFile.size)})</p>
	{:else}
		<p class="file-info">Nenhum arquivo selecionado.</p>
	{/if}

	<div class="audio-actions">
		<button type="button" onclick={handleTranscribe} disabled={!selectedFile || isTranscribing}>
			{isTranscribing ? 'Transcrevendo áudio...' : 'Transcrever áudio'}
		</button>
	</div>

	{#if isTranscribing}
		<p class="loading">Transcrevendo áudio...</p>
	{/if}
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
</section>

<style>
	.audio-upload {
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
	.file-info,
	.loading,
	.error {
		margin: 0;
	}

	h2 {
		font-size: 1.15rem;
		color: #22325f;
	}

	.hint,
	.file-info {
		line-height: 1.5;
		color: #52627f;
	}

	.file-label {
		font-weight: 900;
		color: #22325f;
	}

	input[type='file'] {
		width: 100%;
		border: 1px dashed rgba(74, 93, 142, 0.35);
		border-radius: 1rem;
		padding: 0.85rem;
		background: #fff;
		font: inherit;
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
		cursor: pointer;
	}

	button:disabled {
		cursor: wait;
		opacity: 0.68;
	}

	.loading {
		font-weight: 900;
		color: #22325f;
	}

	.error {
		font-weight: 900;
		color: #b42318;
	}
</style>

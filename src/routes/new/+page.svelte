<script lang="ts">
	import AudioUploadPanel from '$lib/components/AudioUploadPanel.svelte';
	import CardCRM from '$lib/components/CardCRM.svelte';
	import { createApiCard } from '$lib/utils/cardsApi';
	import { saveCard } from '$lib/utils/localCards';
	import { extractCrmWithAI } from '$lib/utils/extractCrmApi';
	import type { CRMCard } from '$lib/types';

	let originalText = $state('');
	let generatedCard = $state<CRMCard | null>(null);
	let successMessage = $state('');
	let apiMessage = $state('');
	let apiError = $state('');
	let isSavingToCrm = $state(false);
	let isGeneratingPreview = $state(false);
	let fallbackMessage = $state('');
	let audioResetKey = $state(0);

	function createCardId() {
		if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
			return crypto.randomUUID();
		}

		return `preview-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
	}

	function mockExtractCRM(text: string): CRMCard {
		const normalizedText = text.trim();
		const isDimensa = normalizedText.toLowerCase().includes('dimensa');

		return {
			id: createCardId(),
			empresa: isDimensa ? 'Dimensa' : 'Empresa em análise',
			pessoa: isDimensa ? 'Contato Dimensa' : 'Contato comercial',
			cargo: isDimensa ? 'Stakeholder de transformação digital' : 'Pessoa principal da conversa',
			prioridade: 'media',
			score: 72,
			etapa_funil: 'Relacionamento futuro',
			resumo_curto: isDimensa
				? 'Dimensa deve ser nutrida com evolução do MVP e exemplos práticos antes de nova agenda.'
				: 'Conversa registrada para nutrir relacionamento e retomar contato com próximos passos claros.',
			resumo_completo:
				normalizedText ||
				'Texto comercial convertido em card mockado para validar o fluxo de geração e salvamento local.',
			oportunidade: 'Usar o CRM Falado para transformar conversas em memória comercial acionável.',
			objecao: 'Ainda é necessário validar timing, orçamento e prioridade interna antes de avançar.',
			proxima_acao: 'Retomar contato com demonstração curta e exemplos de cards gerados pelo MVP.',
			tags: isDimensa ? ['dimensa', 'mvp', 'relacionamento'] : ['mvp', 'relacionamento', 'follow-up'],
			historico: ['Preview gerado via mockExtractCRM.', 'Card ainda sem integração com IA ou áudio.']
		};
	}

	async function generatePreview() {
		const text = originalText.trim();

		if (!text) {
			apiError = 'Informe um texto comercial para gerar o preview.';
			return;
		}

		successMessage = '';
		apiMessage = '';
		apiError = '';
		fallbackMessage = '';
		isSavingToCrm = false;
		isGeneratingPreview = true;

		try {
			generatedCard = await extractCrmWithAI(text);
		} catch {
			generatedCard = mockExtractCRM(text);
			fallbackMessage = 'IA indisponível. Preview gerado com regra local.';
		} finally {
			isGeneratingPreview = false;
		}
	}

	function saveGeneratedCard() {
		if (!generatedCard) {
			return;
		}

		saveCard(generatedCard);
		successMessage = 'Card salvo no funil.';
	}

	async function saveGeneratedCardViaApi() {
		if (!generatedCard) {
			return;
		}

		isSavingToCrm = true;
		apiMessage = '';
		apiError = '';

		try {
			generatedCard = await createApiCard(generatedCard);
			apiMessage = 'Card salvo no CRM.';
			successMessage = '';
		} catch (error) {
			apiError = error instanceof Error ? error.message : 'Não foi possível salvar o card no CRM.';
		} finally {
			isSavingToCrm = false;
		}
	}

	function handleAudioTranscribed(text: string) {
		originalText = text;
		generatedCard = null;
		successMessage = '';
		apiMessage = '';
		apiError = '';
		fallbackMessage = '';
	}

	function clearForm() {
		originalText = '';
		generatedCard = null;
		successMessage = '';
		apiMessage = '';
		apiError = '';
		fallbackMessage = '';
		isSavingToCrm = false;
		isGeneratingPreview = false;
		audioResetKey += 1;
	}
</script>

<svelte:head>
	<title>CRM Falado | Novo card</title>
	<meta name="description" content="Gerar preview de card CRM a partir de texto colado." />
</svelte:head>

<main class="new-page">
	<section class="hero" aria-labelledby="page-title">
		<nav class="nav-links" aria-label="Navegação principal">
			<a href="/">← Início</a>
			<a href="/funnel">Ver funil</a>
		</nav>
		<p class="eyebrow">Sprint 9 · Novo card</p>
		<h1 id="page-title">Cole uma conversa comercial e gere um preview de card.</h1>
		<p class="intro">
			O extrator usa IA no servidor e mantém fallback local quando a IA estiver indisponível. Agora você também pode transcrever áudio no servidor antes de gerar o card. Ao salvar, o card entra no CRM via Turso e aparece automaticamente no funil.
		</p>
	</section>

	<section class="workspace" aria-label="Gerador de card">
		<form class="input-panel" onsubmit={(event) => { event.preventDefault(); generatePreview(); }}>
			<AudioUploadPanel onTranscribed={handleAudioTranscribed} resetKey={audioResetKey} />

			<label for="conversation">Texto original</label>
			<textarea
				id="conversation"
				bind:value={originalText}
				placeholder="Cole aqui a conversa, ata ou resumo comercial da Dimensa..."
			></textarea>

			<div class="actions">
				<button type="submit" disabled={isGeneratingPreview}>
					{isGeneratingPreview ? 'Gerando card com IA...' : 'Gerar preview do card'}
				</button>
				<button class="secondary" type="button" onclick={clearForm}>Limpar</button>
			</div>
		</form>

		<div class="preview-panel">
			{#if isGeneratingPreview}
				<p class="loading">Gerando card com IA...</p>
			{/if}
			{#if fallbackMessage}
				<p class="warning">{fallbackMessage}</p>
			{/if}
			{#if apiError && !generatedCard}
				<p class="error">{apiError}</p>
			{/if}
			{#if generatedCard}
				<CardCRM card={generatedCard} />
				<div class="save-actions">
					<button type="button" onclick={saveGeneratedCardViaApi} disabled={isSavingToCrm}>
						{isSavingToCrm ? 'Salvando...' : 'Salvar no CRM'}
					</button>
					{#if apiMessage}
						<p class="success">{apiMessage}</p>
						<a class="funnel-button" href="/funnel">Ver no funil</a>
					{/if}
					{#if apiError}
						<p class="error">{apiError}</p>
					{/if}
				</div>
				<details class="legacy-persistence">
					<summary>Persistência local legado</summary>
					<p>Use apenas para validar cards no navegador sem passar pelo CRM.</p>
					<button class="secondary legacy-button" type="button" onclick={saveGeneratedCard}>Salvar no funil local</button>
					{#if successMessage}
						<p class="success">{successMessage}</p>
					{/if}
				</details>
				<article class="original-text">
					<h2>Texto original</h2>
					<p>{originalText || 'Nenhum texto informado.'}</p>
				</article>
			{:else}
				<p class="empty-preview">O preview do card aparecerá aqui após a geração.</p>
			{/if}
		</div>
	</section>
</main>

<style>
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(html),
	:global(body) {
		width: 100%;
		margin: 0;
		overflow-x: hidden;
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background: #dfeaff;
		color: #10172f;
	}

	.new-page {
		min-height: 100vh;
		padding: clamp(1rem, 4vw, 2rem);
		background:
			radial-gradient(circle at 12% 10%, rgba(125, 163, 229, 0.35), transparent 22rem),
			linear-gradient(120deg, #eef5ff 0%, #d7e5ff 62%, #eaf8ff 100%);
	}

	.hero,
	.workspace {
		max-width: 1180px;
		margin: 0 auto;
	}

	.nav-links,
	.actions,
	.save-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	a,
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

	.nav-links a,
	.secondary,
	.funnel-button {
		background: #ffffff;
		color: #22325f;
	}

	.eyebrow {
		margin: 2rem 0 0.75rem;
		font-size: 0.85rem;
		font-weight: 900;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #4c63f2;
	}

	h1 {
		max-width: 900px;
		margin: 0;
		font-size: clamp(2.4rem, 7vw, 5rem);
		line-height: 0.96;
		letter-spacing: -0.07em;
	}

	.intro {
		max-width: 760px;
		font-size: 1.08rem;
		line-height: 1.7;
		color: #273858;
	}

	.workspace {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
		gap: 1.5rem;
		align-items: start;
		margin-top: 1.5rem;
	}

	.input-panel,
	.preview-panel,
	.original-text,
	.empty-preview {
		border: 1px solid rgba(74, 93, 142, 0.16);
		border-radius: 1.5rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.72);
		box-shadow: 0 18px 45px rgba(32, 45, 84, 0.1);
	}

	.input-panel {
		display: grid;
		gap: 1rem;
	}

	label {
		font-weight: 900;
		color: #22325f;
	}

	textarea {
		min-height: 380px;
		resize: vertical;
		border: 1px solid rgba(74, 93, 142, 0.25);
		border-radius: 1rem;
		padding: 1rem;
		font: inherit;
		line-height: 1.6;
	}

	.preview-panel {
		display: grid;
		gap: 1rem;
		justify-items: center;
	}

	.success,
	.error,
	.warning,
	.loading {
		margin: 0;
		font-weight: 900;
	}

	.success {
		color: #157347;
	}

	.error {
		color: #b42318;
	}

	.warning {
		color: #b54708;
	}

	.loading {
		color: #22325f;
	}

	button:disabled {
		cursor: wait;
		opacity: 0.68;
	}

	.legacy-persistence {
		width: 100%;
		border-top: 1px solid rgba(74, 93, 142, 0.16);
		padding-top: 0.75rem;
		color: #52627f;
	}

	.legacy-persistence summary {
		cursor: pointer;
		font-weight: 900;
		color: #52627f;
	}

	.legacy-persistence p {
		margin: 0.5rem 0;
	}

	.legacy-button {
		padding: 0.65rem 0.9rem;
	}

	.original-text {
		width: 100%;
		box-shadow: none;
	}

	.original-text h2 {
		margin: 0 0 0.5rem;
	}

	.original-text p {
		margin: 0;
		white-space: pre-wrap;
		line-height: 1.6;
		color: #273858;
	}

	.empty-preview {
		width: 100%;
		margin: 0;
		color: #52627f;
	}

	@media (max-width: 880px) {
		.workspace {
			grid-template-columns: 1fr;
		}
	}
</style>

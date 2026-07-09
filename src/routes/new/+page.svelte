<script lang="ts">
	import CardPreviewPanel from '$lib/components/CardPreviewPanel.svelte';
	import TextInputPanel from '$lib/components/TextInputPanel.svelte';
	import type { CRMCard } from '$lib/types';
	import { mockExtractCRM } from '$lib/utils/mockExtractCRM';

	let text = $state('');
	let generatedCard = $state<CRMCard | null>(null);
	let originalText = $state('');

	function generatePreview() {
		const trimmedText = text.trim();

		if (!trimmedText) return;

		generatedCard = mockExtractCRM(trimmedText);
		originalText = trimmedText;
	}

	function clearPreview() {
		text = '';
		generatedCard = null;
		originalText = '';
	}
</script>

<svelte:head>
	<title>CRM Falado | Nova conversa</title>
	<meta name="description" content="Gere um preview mockado de card CRM a partir de texto." />
</svelte:head>

<main class="new-page">
	<section class="hero" aria-labelledby="page-title">
		<nav class="top-actions" aria-label="Navegação principal">
			<a class="nav-link" href="/">← Voltar para início</a>
			<a class="nav-link primary" href="/funnel">Ir para o funil</a>
		</nav>
		<div>
			<p class="eyebrow">Sprint 3 · Texto para card</p>
			<h1 id="page-title">Nova conversa comercial</h1>
			<p class="intro">Cole uma nota, transcrição ou resumo de conversa para gerar um card CRM.</p>
		</div>
	</section>

	<section class="workspace" aria-label="Gerador de preview de card CRM">
		<TextInputPanel bind:text onGenerate={generatePreview} onClear={clearPreview} />
		<CardPreviewPanel card={generatedCard} {originalText} />
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
		max-width: 100%;
		min-width: 0;
		margin: 0;
		overflow-x: hidden;
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background: #dfeaff;
		color: #10172f;
	}

	.new-page {
		min-height: 100vh;
		overflow-x: hidden;
		padding: clamp(1rem, 4vw, 2rem);
		background:
			radial-gradient(circle at 12% 10%, rgba(125, 163, 229, 0.35), transparent 22rem),
			linear-gradient(120deg, #eef5ff 0%, #d7e5ff 62%, #eaf8ff 100%);
	}

	.hero,
	.workspace {
		width: 100%;
		max-width: 1180px;
		margin: 0 auto;
	}

	.hero {
		display: grid;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.top-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.nav-link {
		width: fit-content;
		border-radius: 999px;
		padding: 0.75rem 1rem;
		background: #ffffff;
		color: #22325f;
		font-weight: 900;
		text-decoration: none;
		box-shadow: 0 10px 30px rgba(32, 45, 84, 0.1);
	}

	.nav-link.primary {
		background: #22325f;
		color: #fff;
	}

	.eyebrow {
		margin: 0 0 0.75rem;
		font-size: 0.85rem;
		font-weight: 900;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #4c63f2;
	}

	h1 {
		max-width: 900px;
		margin: 0;
		font-size: clamp(2.6rem, 7vw, 5rem);
		line-height: 0.96;
		letter-spacing: -0.07em;
	}

	.intro {
		max-width: 720px;
		margin: 1rem 0 0;
		font-size: 1.08rem;
		line-height: 1.7;
		color: #273858;
	}

	.workspace {
		display: grid;
		grid-template-columns: minmax(280px, 0.86fr) minmax(320px, 1.14fr);
		align-items: start;
		gap: clamp(1rem, 3vw, 1.5rem);
	}

	@media (max-width: 980px) {
		.workspace {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 520px) {
		.new-page {
			padding: 1rem 0.75rem 2rem;
		}

		h1 {
			font-size: clamp(2.5rem, 14vw, 3.35rem);
		}
	}
</style>

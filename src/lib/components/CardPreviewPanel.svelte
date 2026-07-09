<script lang="ts">
	import type { CRMCard } from '$lib/types';
	import CardCRM from './CardCRM.svelte';

	let { card, originalText } = $props<{ card: CRMCard | null; originalText: string }>();
</script>

<section class="preview-panel" aria-labelledby="preview-title">
	<div class="panel-heading">
		<p class="eyebrow">Preview</p>
		<h2 id="preview-title">Card CRM gerado</h2>
	</div>

	{#if card}
		<div class="preview-grid">
			<div class="card-wrap">
				<CardCRM {card} />
			</div>
			<article class="original-text" aria-labelledby="original-title">
				<h3 id="original-title">Texto original</h3>
				<p>{originalText}</p>
			</article>
		</div>
	{:else}
		<div class="empty-state">
			<h3>Nenhum preview gerado ainda</h3>
			<p>Preencha a nota comercial e clique em “Gerar preview do card”.</p>
		</div>
	{/if}
</section>

<style>
	.preview-panel {
		display: grid;
		gap: 1.25rem;
		min-width: 0;
	}

	.panel-heading,
	.empty-state,
	.original-text {
		border: 1px solid rgba(74, 93, 142, 0.16);
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.78);
		box-shadow: 0 20px 50px rgba(32, 45, 84, 0.1);
	}

	.panel-heading {
		padding: 1rem 1.25rem;
	}

	.eyebrow {
		margin: 0 0 0.4rem;
		font-size: 0.78rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #4c63f2;
	}

	h2,
	h3,
	p {
		margin: 0;
	}

	h2 {
		font-size: clamp(1.55rem, 3vw, 2rem);
		letter-spacing: -0.04em;
	}

	.preview-grid {
		display: grid;
		grid-template-columns: minmax(280px, 420px) minmax(240px, 1fr);
		align-items: start;
		gap: 1rem;
		min-width: 0;
	}

	.card-wrap {
		display: flex;
		justify-content: center;
		min-width: 0;
	}

	.original-text,
	.empty-state {
		padding: 1rem 1.25rem;
	}

	.original-text h3,
	.empty-state h3 {
		margin-bottom: 0.6rem;
		color: #22325f;
	}

	.original-text p,
	.empty-state p {
		white-space: pre-wrap;
		line-height: 1.65;
		color: #344463;
	}

	@media (max-width: 980px) {
		.preview-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>

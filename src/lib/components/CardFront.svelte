<script lang="ts">
	import TagBadge from '$lib/components/TagBadge.svelte';
	import type { CRMCard } from '$lib/types/crm';

	type Props = {
		card: CRMCard;
	};

	let { card }: Props = $props();
</script>

<section class="front" aria-label="Frente do card CRM">
	<div class="top-row">
		<p class="eyebrow">CRM Falado</p>
		<span class="priority">{card.prioridade}</span>
	</div>

	<div class="identity">
		<h2>{card.empresa}</h2>
		<p>{card.pessoa}</p>
		<span>{card.cargo}</span>
	</div>

	<div class="metrics">
		<div>
			<strong>{card.score}</strong>
			<span>score</span>
		</div>
		<div>
			<strong>{card.etapa_funil}</strong>
			<span>etapa do funil</span>
		</div>
	</div>

	<p class="summary">{card.resumo_curto}</p>

	<div class="tags" aria-label="Tags do card">
		{#each card.tags as tag}
			<TagBadge label={tag} />
		{/each}
	</div>
</section>

<style>
	.front {
		display: flex;
		min-height: 100%;
		flex-direction: column;
		gap: 1.4rem;
		border-radius: 1.4rem;
		padding: 1.5rem;
		background:
			radial-gradient(circle at top left, rgba(125, 211, 252, 0.45), transparent 36%),
			linear-gradient(145deg, #172554 0%, #1e1b4b 48%, #312e81 100%);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
		color: #ffffff;
	}

	.top-row,
	.metrics,
	.tags {
		display: flex;
		align-items: center;
	}

	.top-row {
		justify-content: space-between;
		gap: 1rem;
	}

	.eyebrow {
		margin: 0;
		color: #bfdbfe;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.priority {
		border-radius: 999px;
		padding: 0.4rem 0.7rem;
		background: #facc15;
		color: #422006;
		font-size: 0.78rem;
		font-weight: 900;
	}

	.identity h2,
	.identity p,
	.identity span,
	.summary {
		margin: 0;
	}

	.identity h2 {
		font-size: clamp(2rem, 7vw, 3.25rem);
		line-height: 0.95;
		letter-spacing: -0.08em;
	}

	.identity p {
		margin-top: 0.9rem;
		font-size: 1.2rem;
		font-weight: 800;
	}

	.identity span {
		display: block;
		margin-top: 0.25rem;
		color: #c7d2fe;
	}

	.metrics {
		gap: 0.75rem;
	}

	.metrics div {
		flex: 1;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 1rem;
		padding: 0.85rem;
		background: rgba(15, 23, 42, 0.32);
	}

	.metrics strong,
	.metrics span {
		display: block;
	}

	.metrics strong {
		font-size: 1.35rem;
	}

	.metrics span {
		margin-top: 0.2rem;
		color: #cbd5e1;
		font-size: 0.74rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.summary {
		color: #e0f2fe;
		font-size: 1rem;
		line-height: 1.55;
	}

	.tags {
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: auto;
	}
</style>

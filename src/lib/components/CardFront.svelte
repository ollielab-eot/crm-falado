<script lang="ts">
	import type { CRMCard } from '$lib/types';
	import TagBadge from './TagBadge.svelte';

	let { card } = $props<{ card: CRMCard }>();

	function priorityLabel(priority: CRMCard['prioridade']) {
		if (priority === 'alta') return 'Alta';
		if (priority === 'media') return 'Média';
		return 'Baixa';
	}
</script>

<div class="card-face card-front">
	<div class="card-header">
		<span class="brand">CRM Falado</span>
		<span class:alta={card.prioridade === 'alta'} class="priority">{priorityLabel(card.prioridade)}</span>
	</div>

	<div>
		<span class="company">{card.empresa}</span>
		<span class="person">{card.pessoa}</span>
		<span class="role">{card.cargo}</span>
	</div>

	<div class="stats-grid">
		<span class="stat-card">
			<strong>{card.score}</strong>
			<small>Score</small>
		</span>
		<span class="stat-card">
			<strong>{card.etapa_funil}</strong>
			<small>Etapa</small>
		</span>
	</div>

	<p class="summary">{card.resumo_curto}</p>

	<div class="tags" aria-label="Tags">
		{#each card.tags.slice(0, 3) as tag}
			<TagBadge label={tag} />
		{/each}
	</div>

	<span class="tap-hint">Clique para ver o verso</span>
</div>

<style>
	.card-face {
		grid-area: 1 / 1;
		display: flex;
		width: 100%;
		height: 100%;
		min-width: 0;
		flex-direction: column;
		padding: clamp(1.1rem, 3vw, 1.45rem);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: inherit;
		background: linear-gradient(160deg, #5d79a7 0%, #22185b 74%);
		box-shadow: 0 24px 55px rgba(22, 31, 74, 0.2);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		color: #ffffff;
		text-align: left;
		overflow: hidden;
	}

	.card-front {
		gap: 1rem;
	}

	.card-header,
	.stats-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 0.8rem;
		align-items: start;
	}

	.brand {
		font-size: 0.78rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		line-height: 1.35;
		text-transform: uppercase;
		color: #d7e4ff;
	}

	.priority {
		border-radius: 999px;
		padding: 0.5rem 0.75rem;
		background: #c8d7ff;
		color: #14213d;
		font-size: 0.78rem;
		font-weight: 900;
		white-space: nowrap;
	}

	.priority.alta {
		background: #ffd400;
		color: #1f1900;
	}

	.company {
		display: block;
		overflow-wrap: anywhere;
		font-size: clamp(2.35rem, 5vw, 3.25rem);
		font-weight: 950;
		line-height: 0.9;
		letter-spacing: -0.07em;
	}

	.person {
		display: block;
		margin-top: 1rem;
		font-size: 1.35rem;
		font-weight: 950;
		line-height: 1.05;
	}

	.role,
	.summary {
		font-size: 0.94rem;
		line-height: 1.4;
		color: #d4def6;
	}

	.role {
		display: block;
		margin-top: 0.4rem;
	}

	.stats-grid {
		grid-template-columns: 0.7fr 1.3fr;
	}

	.stat-card {
		display: flex;
		min-width: 0;
		min-height: 5.1rem;
		flex-direction: column;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 1rem;
		padding: 0.8rem;
		background: rgba(255, 255, 255, 0.06);
	}

	.stat-card strong {
		overflow-wrap: anywhere;
		font-size: 1.4rem;
		line-height: 1.05;
	}

	.stat-card small {
		margin-top: 0.35rem;
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #d6def5;
	}

	.summary {
		margin: 0;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: auto;
	}

	.tap-hint {
		display: inline-flex;
		align-self: flex-start;
		border-radius: 999px;
		padding: 0.5rem 0.75rem;
		background: rgba(255, 255, 255, 0.12);
		font-size: 0.75rem;
		font-weight: 800;
		color: #f4f7ff;
	}
</style>

<script lang="ts">
	import type { CRMCard, FunnelStage } from '$lib/types';
	import CardCRM from './CardCRM.svelte';

	let {
		stage,
		cards,
		mockedCardIds = new Set<string>(),
		savedCardIds = new Set<string>(),
		apiCardIds = new Set<string>()
	} = $props<{
		stage: FunnelStage;
		cards: CRMCard[];
		mockedCardIds?: Set<string>;
		savedCardIds?: Set<string>;
		apiCardIds?: Set<string>;
	}>();
</script>

<section class="funnel-column" aria-labelledby={`stage-${stage}`}>
	<header class="column-header">
		<h2 id={`stage-${stage}`}>{stage}</h2>
		<span>{cards.length}</span>
	</header>

	<div class="cards-list">
		{#if cards.length > 0}
			{#each cards as card (card.id)}
				<div class="card-shell">
					<CardCRM {card} compact />
					<div class="source-badges" aria-label="Origem do card">
						{#if mockedCardIds.has(card.id)}
							<p class="mock-badge">Mock</p>
						{/if}
						{#if savedCardIds.has(card.id)}
							<p class="local-badge">Local</p>
						{/if}
						{#if apiCardIds.has(card.id)}
							<p class="api-badge">CRM</p>
						{/if}
					</div>
				</div>
			{/each}
		{:else}
			<p class="empty-state">Nenhum card nesta etapa.</p>
		{/if}
	</div>
</section>

<style>
	.funnel-column {
		display: flex;
		width: min(82vw, 340px);
		min-width: min(82vw, 340px);
		max-height: 100%;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid rgba(74, 93, 142, 0.16);
		border-radius: 1.5rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.72);
		box-shadow: 0 18px 45px rgba(32, 45, 84, 0.1);
	}

	.column-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	h2 {
		margin: 0;
		font-size: 1.05rem;
		line-height: 1.15;
		color: #15213f;
	}

	.column-header span {
		display: inline-grid;
		min-width: 2rem;
		height: 2rem;
		place-items: center;
		border-radius: 999px;
		background: #23325f;
		color: #fff;
		font-weight: 900;
	}

	.cards-list {
		display: grid;
		gap: 1rem;
		overflow-y: auto;
		padding-bottom: 0.25rem;
	}

	.card-shell {
		display: grid;
		gap: 0.5rem;
	}

	.source-badges {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.api-badge,
	.local-badge,
	.mock-badge {
		width: fit-content;
		margin: 0;
		border-radius: 999px;
		padding: 0.35rem 0.65rem;
		background: rgba(76, 99, 242, 0.12);
		color: #3446c5;
		font-size: 0.78rem;
		font-weight: 900;
	}

	.api-badge {
		background: rgba(21, 115, 71, 0.12);
		color: #157347;
	}

	.mock-badge {
		background: rgba(82, 98, 127, 0.12);
		color: #52627f;
	}

	.empty-state {
		margin: 0;
		border: 1px dashed rgba(74, 93, 142, 0.28);
		border-radius: 1rem;
		padding: 1rem;
		color: #52627f;
	}
</style>

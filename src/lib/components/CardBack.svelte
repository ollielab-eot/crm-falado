<script lang="ts">
	import type { CRMCard } from '$lib/types';
	import TagBadge from './TagBadge.svelte';

	let { card } = $props<{ card: CRMCard }>();
</script>

<div class="card-face card-back">
	<span class="back-heading">Resumo completo</span>

	<div class="notes-list">
		<p>{card.resumo_completo}</p>
		<div class="info-block">
			<strong>Oportunidade</strong>
			<span>{card.oportunidade}</span>
		</div>
		<div class="info-block">
			<strong>Objeção</strong>
			<span>{card.objecao}</span>
		</div>
		<div class="info-block action">
			<strong>Próxima ação</strong>
			<span>{card.proxima_acao}</span>
		</div>
		<div class="info-block">
			<strong>Histórico</strong>
			<ul>
				{#each card.historico as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="tags" aria-label="Tags">
		{#each card.tags as tag}
			<TagBadge label={tag} />
		{/each}
	</div>

	<span class="tap-hint back-hint">Clique para voltar</span>
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
		background: linear-gradient(160deg, #25325c 0%, #120d34 74%);
		box-shadow: 0 24px 55px rgba(22, 31, 74, 0.2);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		color: #ffffff;
		text-align: left;
		overflow: hidden;
	}

	.card-back {
		gap: 0.85rem;
		transform: rotateY(180deg);
	}

	.back-heading {
		font-size: 2rem;
		font-weight: 950;
		line-height: 0.96;
		letter-spacing: -0.06em;
	}

	.notes-list {
		display: flex;
		min-height: 0;
		flex: 1 1 auto;
		flex-direction: column;
		gap: 0.7rem;
		overflow-y: auto;
		padding-right: 0.25rem;
	}

	p,
	ul {
		margin: 0;
	}

	.info-block,
	p {
		border-radius: 0.9rem;
		padding: 0.8rem;
		background: rgba(255, 255, 255, 0.1);
		line-height: 1.42;
		color: #eef3ff;
	}

	.info-block {
		display: grid;
		gap: 0.3rem;
	}

	.info-block strong {
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #d8e4ff;
	}

	.action {
		background: rgba(255, 212, 0, 0.16);
	}

	ul {
		padding-left: 1rem;
	}

	li + li {
		margin-top: 0.35rem;
	}

	.tags {
		display: flex;
		flex: 0 0 auto;
		flex-wrap: wrap;
		gap: 0.45rem;
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

<script lang="ts">
	import type { CRMCard } from '$lib/types';
	import CardBack from './CardBack.svelte';
	import CardFront from './CardFront.svelte';

	let { card, compact = false } = $props<{ card: CRMCard; compact?: boolean }>();
	let flipped = $state(false);
</script>

<button
	class:flipped
	class:compact
	class="crm-card"
	type="button"
	onclick={() => (flipped = !flipped)}
	aria-label={`Virar card ${card.empresa}`}
	aria-pressed={flipped}
>
	<span class="card-inner">
		<CardFront {card} />
		<CardBack {card} />
	</span>
</button>

<style>
	.crm-card {
		display: block;
		width: 100%;
		max-width: 420px;
		min-width: 0;
		height: clamp(500px, 68vh, 560px);
		padding: 0;
		border: 0;
		border-radius: 2rem;
		background: transparent;
		cursor: pointer;
		perspective: 1200px;
		font: inherit;
	}

	.crm-card.compact {
		height: 520px;
		max-width: none;
		border-radius: 1.6rem;
	}

	.card-inner {
		display: grid;
		width: 100%;
		height: 100%;
		min-width: 0;
		transform-style: preserve-3d;
		transition: transform 600ms ease;
	}

	.crm-card.flipped .card-inner {
		transform: rotateY(180deg);
	}

	@media (max-width: 480px) {
		.crm-card,
		.crm-card.compact {
			height: 500px;
		}
	}
</style>

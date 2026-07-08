<script lang="ts">
	import CardBack from '$lib/components/CardBack.svelte';
	import CardFront from '$lib/components/CardFront.svelte';
	import type { CRMCard } from '$lib/types/crm';

	type Props = {
		card: CRMCard;
	};

	let { card }: Props = $props();
	let flipped = $state(false);
</script>

<article class="crm-card" class:flipped aria-live="polite">
	<div class="card-shell">
		<div class="face front-face" aria-hidden={flipped}>
			<CardFront {card} />
		</div>
		<div class="face back-face" aria-hidden={!flipped}>
			<CardBack {card} />
		</div>
	</div>

	<button type="button" onclick={() => (flipped = !flipped)}>
		{flipped ? 'Ver frente' : 'Virar card'}
	</button>
</article>

<style>
	.crm-card {
		width: min(100%, 27rem);
		perspective: 1200px;
	}

	.card-shell {
		position: relative;
		min-height: 43rem;
		transition: transform 0.7s ease;
		transform-style: preserve-3d;
	}

	.crm-card.flipped .card-shell {
		transform: rotateY(180deg);
	}

	.face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
	}

	.back-face {
		transform: rotateY(180deg);
	}

	button {
		display: block;
		width: 100%;
		margin-top: 1rem;
		border: 0;
		border-radius: 999px;
		padding: 0.9rem 1.25rem;
		background: #2563eb;
		box-shadow: 0 16px 30px rgba(37, 99, 235, 0.24);
		color: white;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 800;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	button:hover {
		background: #1d4ed8;
		transform: translateY(-1px);
	}

	button:focus-visible {
		outline: 3px solid #93c5fd;
		outline-offset: 3px;
	}

	@media (max-width: 520px) {
		.card-shell {
			min-height: 46rem;
		}
	}
</style>

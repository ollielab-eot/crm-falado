<script lang="ts">
	import type { CRMCard } from '$lib/types/crm';

	type Props = {
		card: CRMCard;
	};

	let { card }: Props = $props();
</script>

<section class="back" aria-label="Verso do card CRM">
	<div>
		<p class="eyebrow">Inteligência comercial</p>
		<h2>{card.empresa}</h2>
	</div>

	<div class="history">
		<h3>Histórico</h3>
		<ul>
			{#each card.historico as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>

	<div class="details">
		<div>
			<span>Resumo completo</span>
			<p>{card.resumo_completo}</p>
		</div>
		<div>
			<span>Oportunidade</span>
			<p>{card.oportunidade}</p>
		</div>
		<div>
			<span>Objeção</span>
			<p>{card.objecao}</p>
		</div>
		<div class="next-action">
			<span>Próxima ação</span>
			<p>{card.proxima_acao}</p>
		</div>
	</div>
</section>

<style>
	.back {
		display: flex;
		min-height: 100%;
		flex-direction: column;
		gap: 1rem;
		border-radius: 1.4rem;
		padding: 1.5rem;
		background:
			radial-gradient(circle at bottom right, rgba(251, 191, 36, 0.22), transparent 34%),
			linear-gradient(145deg, #0f172a 0%, #111827 58%, #1e293b 100%);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
		color: #f8fafc;
	}

	.eyebrow,
	h2,
	h3,
	p,
	ul {
		margin: 0;
	}

	.eyebrow {
		color: #fcd34d;
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h2 {
		margin-top: 0.25rem;
		font-size: 2rem;
		letter-spacing: -0.05em;
	}

	.history {
		border: 1px solid rgba(148, 163, 184, 0.28);
		border-radius: 1rem;
		padding: 1rem;
		background: rgba(15, 23, 42, 0.58);
	}

	h3 {
		font-size: 0.8rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.history ul {
		max-height: 8.5rem;
		overflow: auto;
		padding: 0.75rem 0 0 1.1rem;
		color: #cbd5e1;
		line-height: 1.5;
	}

	.history li + li {
		margin-top: 0.55rem;
	}

	.details {
		display: grid;
		gap: 0.75rem;
	}

	.details div {
		border-left: 3px solid #38bdf8;
		padding-left: 0.75rem;
	}

	.details span {
		display: block;
		color: #93c5fd;
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.details p {
		margin-top: 0.25rem;
		color: #e2e8f0;
		line-height: 1.5;
	}

	.details .next-action {
		border-left-color: #facc15;
	}
</style>

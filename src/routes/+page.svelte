<script lang="ts">
	type Card = {
		id: 'dimensa' | 'vivo';
		brand: string;
		priority: string;
		company: string;
		person: string;
		role: string;
		score: string;
		stage: string;
		summary: string;
		backTitle: string;
		notes: string[];
	};

	let flippedCards = $state<Record<Card['id'], boolean>>({
		dimensa: false,
		vivo: false
	});

	const cards: Card[] = [
		{
			id: 'dimensa',
			brand: 'CRM Falado',
			priority: 'Alta',
			company: 'Dimensa',
			person: 'Marina Costa',
			role: 'Diretora de Transformação Digital',
			score: '92',
			stage: 'Proposta',
			summary:
				'Conta estratégica avaliando automação de relacionamento para reduzir fricção no atendimento comercial.',
			backTitle: 'Resumo da conversa',
			notes: [
				'Conta estratégica avaliando automação de relacionamento para reduzir retrabalho comercial.',
				'Interesse principal: registrar conversas, resumir próximos passos e priorizar oportunidades.',
				'Próximo contato combinado para demonstração rápida com decisores do funil.',
				'Risco identificado: integração futura deve ser tratada em outra etapa, fora da Sprint 1.'
			]
		},
		{
			id: 'vivo',
			brand: 'TDW x Vivo',
			priority: 'Estratégico',
			company: 'Vivo',
			person: 'Rodrigo Primo',
			role: 'Pessoa principal da agenda · Vivo',
			score: '609',
			stage: 'Jornadas 2026',
			summary:
				'Reunião inicial para execução do contrato de Multicloud, FinOps e Managed Services por jornadas sob demanda.',
			backTitle: 'Resumo TDW x Vivo',
			notes: [
				'Contrato vencido para prestação de serviços em Multicloud, FinOps, Managed Services, Dados e BI, Teradata Vantage, performance, modernização e IA.',
				'Participantes TDW: Fernando Cristino, Ralf Peterlevitz, Galvão e Moises Bueno.',
				'Participantes Vivo: Carlos Renato de Souza Marques, Fernando Gomes da Costa, Alexandre Teixeira Borges, Christian Perin, Everaldo Aparecido de Amorim e Rodrigo Fabio Primo Pinto.',
				'Carlos Marques foi identificado como Coordenador FinOps e contato relevante: 41 98863-5593.',
				'Para 2026 estão previstas 609 jornadas, equivalentes a 4.872 horas técnicas, com maior foco em FinOps, Cloud e IA.',
				'Recomendação: estruturar backlog, governança semanal operacional e mensal executiva, critérios de aceite e evidências de execução.',
				'Primeiros 30 dias: validar pontos focais por tema, matriz de issues, ferramenta de controle e plano de ação.'
			]
		}
	];
</script>

<svelte:head>
	<title>CRM Falado | Sprint 1</title>
	<meta
		name="description"
		content="Cards visuais responsivos da Sprint 1 do CRM Falado."
	/>
</svelte:head>

<main class="sprint-page">
	<section class="sprint-shell" aria-labelledby="page-title">
		<div class="copy-column">
			<p class="eyebrow">Sprint 1 · Card visual</p>
			<h1 id="page-title">CRM Falado transforma conversas em cards inteligentes.</h1>
			<p class="intro">
				Mock visual da Dimensa para validar a experiência de cartas colecionáveis com
				frente, verso e informações comerciais acionáveis.
			</p>
		</div>

		<div class="cards-row" aria-label="Cards CRM">
			{#each cards as card}
				<div class="card-column">
					<button
						class:flipped={flippedCards[card.id]}
						class="crm-card"
						type="button"
						onclick={() => (flippedCards[card.id] = !flippedCards[card.id])}
						aria-label={`Virar card ${card.company}`}
						aria-pressed={flippedCards[card.id]}
					>
						<span class="card-inner">
							<span class="card-face card-front">
								<span class="card-header">
									<span class="brand">{card.brand}</span>
									<span class="priority">{card.priority}</span>
								</span>

								<span class="company">{card.company}</span>

								<span class="person-block">
									<span class="person">{card.person}</span>
									<span class="role">{card.role}</span>
								</span>

								<span class="stats-grid">
									<span class="stat-card">
										<strong>{card.score}</strong>
										<small>Score</small>
									</span>
									<span class="stat-card">
										<strong>{card.stage}</strong>
										<small>Etapa / foco</small>
									</span>
								</span>

								<span class="summary">{card.summary}</span>
								<span class="tap-hint">Clique para ver o verso</span>
							</span>

							<span class="card-face card-back">
								<span class="back-heading">{card.backTitle}</span>
								<span class="notes-list">
									{#each card.notes as note}
										<span class="note-item">{note}</span>
									{/each}
								</span>
								<span class="tap-hint back-hint">Clique para voltar</span>
							</span>
						</span>
					</button>
				</div>
			{/each}
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
		max-width: 100%;
		min-width: 0;
		margin: 0;
		overflow-x: hidden;
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background: #dfeaff;
		color: #10172f;
	}

	:global(body) {
		min-height: 100vh;
	}

	:global(button) {
		font: inherit;
	}

	.sprint-page {
		width: 100%;
		max-width: 100%;
		min-width: 0;
		min-height: 100vh;
		overflow-x: hidden;
		box-sizing: border-box;
		background:
			radial-gradient(circle at 14% 20%, rgba(125, 163, 229, 0.3), transparent 22rem),
			linear-gradient(120deg, #eef5ff 0%, #d7e5ff 62%, #eaf8ff 100%);
	}

	.sprint-shell {
		width: 100%;
		max-width: 1200px;
		min-width: 0;
		min-height: 100vh;
		margin: 0 auto;
		padding: clamp(2rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem);
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		gap: clamp(2rem, 5vw, 4rem);
		overflow-x: hidden;
	}

	.copy-column {
		min-width: 0;
		max-width: 920px;
		margin: 0 auto;
		text-align: center;
	}

	.eyebrow {
		margin: 0 0 1.25rem;
		font-size: clamp(0.75rem, 1.5vw, 0.95rem);
		font-weight: 900;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: #4c63f2;
	}

	h1 {
		max-width: 920px;
		margin: 0;
		font-size: clamp(3rem, 7vw, 5.25rem);
		line-height: 0.96;
		letter-spacing: -0.07em;
	}

	.intro {
		max-width: 760px;
		margin: 1.5rem auto 0;
		font-size: clamp(1rem, 1.6vw, 1.25rem);
		line-height: 1.7;
		color: #273858;
	}

	.cards-row {
		width: 100%;
		min-width: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(340px, 420px));
		justify-content: center;
		align-items: start;
		gap: clamp(1.5rem, 4vw, 3rem);
	}

	.card-column {
		width: 100%;
		min-width: 0;
		display: flex;
		justify-content: center;
		perspective: 1200px;
	}

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

	.card-face {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		min-width: 0;
		padding: clamp(1.35rem, 4vw, 2rem);
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: inherit;
		background: linear-gradient(160deg, #5d79a7 0%, #22185b 74%);
		box-shadow: 0 28px 70px rgba(22, 31, 74, 0.26);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		color: #ffffff;
		text-align: left;
		overflow: hidden;
	}

	.card-front {
		gap: clamp(1rem, 2.5vh, 1.5rem);
	}

	.card-back {
		gap: 1rem;
		transform: rotateY(180deg);
	}

	.card-header,
	.stats-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 1rem;
		align-items: start;
	}

	.brand {
		max-width: 9rem;
		font-size: 0.95rem;
		font-weight: 900;
		letter-spacing: 0.22em;
		line-height: 1.35;
		text-transform: uppercase;
		color: #d7e4ff;
	}

	.priority {
		border-radius: 999px;
		padding: 0.65rem 1rem;
		background: #ffd400;
		color: #1f1900;
		font-weight: 900;
		white-space: nowrap;
	}

	.company {
		display: block;
		max-width: 100%;
		overflow-wrap: anywhere;
		font-size: clamp(3.2rem, 12vw, 4.35rem);
		font-weight: 950;
		line-height: 0.9;
		letter-spacing: -0.08em;
	}

	.person-block,
	.summary {
		display: block;
		max-width: 100%;
	}

	.person {
		display: block;
		font-size: clamp(1.6rem, 5vw, 2.15rem);
		font-weight: 950;
		line-height: 1.05;
	}

	.role,
	.summary {
		font-size: clamp(1rem, 3vw, 1.25rem);
		line-height: 1.38;
		color: #d4def6;
	}

	.role {
		display: block;
		margin-top: 0.65rem;
	}

	.stats-grid {
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
	}

	.stat-card {
		display: flex;
		min-width: 0;
		min-height: 6.4rem;
		flex-direction: column;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 1.25rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.06);
	}

	.stat-card strong {
		display: block;
		max-width: 100%;
		overflow-wrap: anywhere;
		font-size: clamp(1.55rem, 5vw, 1.95rem);
		line-height: 1.05;
	}

	.stat-card small {
		display: block;
		margin-top: 0.5rem;
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #d6def5;
	}

	.summary {
		margin-top: auto;
	}

	.tap-hint {
		display: inline-flex;
		align-self: flex-start;
		border-radius: 999px;
		padding: 0.55rem 0.85rem;
		background: rgba(255, 255, 255, 0.12);
		font-size: 0.8rem;
		font-weight: 800;
		color: #f4f7ff;
	}

	.back-heading {
		font-size: clamp(2rem, 7vw, 3rem);
		font-weight: 950;
		line-height: 0.96;
		letter-spacing: -0.06em;
	}

	.notes-list {
		display: flex;
		min-height: 0;
		flex: 1 1 auto;
		flex-direction: column;
		gap: 0.8rem;
		overflow-y: auto;
		padding-right: 0.25rem;
	}

	.note-item {
		display: block;
		border-radius: 1rem;
		padding: 0.95rem 1rem;
		background: rgba(255, 255, 255, 0.1);
		line-height: 1.45;
		color: #eef3ff;
	}

	.back-hint {
		flex: 0 0 auto;
	}

	@media (max-width: 920px) {
		.cards-row {
			grid-template-columns: minmax(0, 420px);
		}
	}

	@media (max-width: 480px) {
		.sprint-shell {
			padding: 1.25rem 0.75rem 2rem;
		}

		h1 {
			font-size: clamp(2.55rem, 15vw, 3.4rem);
		}

		.crm-card {
			height: 500px;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

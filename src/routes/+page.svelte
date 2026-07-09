<script lang="ts">
	import CardCRM from '$lib/components/CardCRM.svelte';
	import type { CRMCard } from '$lib/types';

	const cards: CRMCard[] = [
		{
			id: 'dimensa-home',
			empresa: 'Dimensa',
			pessoa: 'Marina Costa',
			cargo: 'Diretora de Transformação Digital',
			prioridade: 'alta',
			score: 92,
			etapa_funil: 'Oportunidade',
			resumo_curto:
				'Conta estratégica avaliando automação de relacionamento para reduzir fricção no atendimento comercial.',
			resumo_completo:
				'Conta estratégica avaliando automação de relacionamento para reduzir retrabalho comercial, resumir próximos passos e priorizar oportunidades.',
			oportunidade: 'Demonstração rápida com decisores do funil.',
			objecao: 'Integração futura deve ser tratada fora da Sprint 1.',
			proxima_acao: 'Agendar demonstração curta com decisores.',
			tags: ['enterprise', 'automação', 'pipeline'],
			historico: ['Mock visual criado na Sprint 1.', 'Frente e verso validados no card colecionável.']
		},
		{
			id: 'vivo-home',
			empresa: 'Vivo',
			pessoa: 'Rodrigo Primo',
			cargo: 'Pessoa principal da agenda · Vivo',
			prioridade: 'alta',
			score: 96,
			etapa_funil: 'Qualificar',
			resumo_curto:
				'Reunião inicial para execução do contrato de Multicloud, FinOps e Managed Services por jornadas sob demanda.',
			resumo_completo:
				'Contrato discutido para serviços em Multicloud, FinOps, Managed Services, Dados, BI, modernização e IA, com governança operacional e executiva.',
			oportunidade: 'Estruturar backlog, critérios de aceite e evidências de execução.',
			objecao: 'Validar pontos focais por tema antes da operação.',
			proxima_acao: 'Confirmar matriz de issues e ferramenta de controle.',
			tags: ['multicloud', 'finops', 'governança'],
			historico: ['Agenda com participantes TDW e Vivo.', 'Primeiros 30 dias focados em governança.']
		}
	];
</script>

<svelte:head>
	<title>CRM Falado | Sprint 1</title>
	<meta name="description" content="Cards visuais responsivos do CRM Falado." />
</svelte:head>

<main class="sprint-page">
	<section class="sprint-shell" aria-labelledby="page-title">
		<div class="copy-column">
			<p class="eyebrow">Sprint 1 · Card visual</p>
			<h1 id="page-title">CRM Falado transforma conversas em cards inteligentes.</h1>
			<p class="intro">
				Mock visual para validar cartas colecionáveis com frente, verso e informações comerciais acionáveis.
			</p>
			<a class="funnel-link" href="/funnel">Ver funil mockado da Sprint 2</a>
		</div>

		<div class="cards-row" aria-label="Cards CRM">
			{#each cards as card (card.id)}
				<div class="card-column">
					<CardCRM {card} />
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

	.sprint-page {
		width: 100%;
		max-width: 100%;
		min-height: 100vh;
		overflow-x: hidden;
		background:
			radial-gradient(circle at 14% 20%, rgba(125, 163, 229, 0.3), transparent 22rem),
			linear-gradient(120deg, #eef5ff 0%, #d7e5ff 62%, #eaf8ff 100%);
	}

	.sprint-shell {
		display: grid;
		width: 100%;
		max-width: 1200px;
		min-height: 100vh;
		margin: 0 auto;
		padding: clamp(2rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem);
		align-items: center;
		gap: clamp(2rem, 5vw, 4rem);
		overflow-x: hidden;
	}

	.copy-column {
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

	.funnel-link {
		display: inline-flex;
		margin-top: 1.5rem;
		border-radius: 999px;
		padding: 0.85rem 1.1rem;
		background: #22325f;
		color: #fff;
		font-weight: 900;
		text-decoration: none;
		box-shadow: 0 16px 35px rgba(32, 45, 84, 0.18);
	}

	.cards-row {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(2, minmax(340px, 420px));
		justify-content: center;
		align-items: start;
		gap: clamp(1.5rem, 4vw, 3rem);
	}

	.card-column {
		display: flex;
		min-width: 0;
		justify-content: center;
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
	}
</style>

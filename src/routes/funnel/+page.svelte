<script lang="ts">
	import { onMount } from 'svelte';
	import FunnelColumn from '$lib/components/FunnelColumn.svelte';
	import { clearApiCards, fetchApiCards } from '$lib/utils/cardsApi';
	import { clearSavedCards, getSavedCards } from '$lib/utils/localCards';
	import type { CRMCard, FunnelStage, Priority } from '$lib/types';

	const stages: FunnelStage[] = [
		'Novo contato',
		'Qualificar',
		'Oportunidade',
		'Relacionamento futuro',
		'Indicação / Rede',
		'Sem ação'
	];

	const mockedCards: CRMCard[] = [
		{
			id: 'dimensa',
			empresa: 'Dimensa',
			pessoa: 'Marina Costa',
			cargo: 'Diretora de Transformação Digital',
			prioridade: 'alta',
			score: 92,
			etapa_funil: 'Oportunidade',
			resumo_curto: 'Conta estratégica avaliando automação de relacionamento e priorização comercial.',
			resumo_completo:
				'Conversa mostrou interesse em transformar reuniões e mensagens em registros acionáveis para reduzir retrabalho e dar visibilidade ao pipeline.',
			oportunidade: 'Piloto com cards inteligentes para contas enterprise e governança de próximos passos.',
			objecao: 'Integrações com sistemas internos devem ficar fora do escopo do MVP.',
			proxima_acao: 'Agendar demonstração curta com decisores do funil na próxima semana.',
			tags: ['enterprise', 'automação', 'pipeline'],
			historico: ['Reunião exploratória concluída.', 'Dor principal: registrar follow-ups com consistência.']
		},
		{
			id: 'vivo',
			empresa: 'Vivo',
			pessoa: 'Rodrigo Primo',
			cargo: 'Pessoa principal da agenda · Vivo',
			prioridade: 'alta',
			score: 96,
			etapa_funil: 'Qualificar',
			resumo_curto: 'Agenda de serviços multicloud, FinOps e dados com potencial de governança por jornadas.',
			resumo_completo:
				'Reunião inicial conectou necessidades de operação, acompanhamento executivo e evidências de execução para jornadas sob demanda.',
			oportunidade: 'Organizar backlog e cards por tema para dar clareza ao avanço das jornadas.',
			objecao: 'Necessidade de alinhar pontos focais e critérios de aceite antes de escalar.',
			proxima_acao: 'Validar matriz de responsáveis e temas prioritários dos primeiros 30 dias.',
			tags: ['multicloud', 'finops', 'governança'],
			historico: ['Contrato discutido em reunião inicial.', 'Foco previsto em Cloud, FinOps, Dados e IA.']
		},
		{
			id: 'obramax',
			empresa: 'Obramax',
			pessoa: 'Paula Andrade',
			cargo: 'Gerente Comercial B2B',
			prioridade: 'media',
			score: 74,
			etapa_funil: 'Novo contato',
			resumo_curto: 'Novo contato interessado em registrar conversas de prospecção e compras recorrentes.',
			resumo_completo:
				'Contato chegou por indicação e quer entender como o CRM Falado poderia resumir interações com compradores profissionais e obras recorrentes.',
			oportunidade: 'Demonstrar captura de histórico e próxima ação para equipes B2B.',
			objecao: 'Ainda não existe orçamento reservado para ferramenta nova.',
			proxima_acao: 'Enviar vídeo de 3 minutos com exemplo de card pós-reunião.',
			tags: ['varejo construção', 'b2b', 'novo lead'],
			historico: ['Contato recebido por mensagem.', 'Solicitou material simples antes de reunião formal.']
		},
		{
			id: 'tdw',
			empresa: 'TDW',
			pessoa: 'Fernando Cristino',
			cargo: 'Executivo de Contas',
			prioridade: 'media',
			score: 81,
			etapa_funil: 'Indicação / Rede',
			resumo_curto: 'Parceiro potencial para usar cards como memória comercial em agendas consultivas.',
			resumo_completo:
				'Conversa indicou que a TDW pode usar o CRM Falado para organizar reuniões complexas e também apresentar a solução em contas estratégicas.',
			oportunidade: 'Criar caso demonstrativo com agendas consultivas e mapa de stakeholders.',
			objecao: 'Precisa ficar claro que a Sprint atual é mockada e sem integração com IA ou banco.',
			proxima_acao: 'Compartilhar o funil mockado e coletar feedback sobre linguagem dos cards.',
			tags: ['parceria', 'consultoria', 'stakeholders'],
			historico: ['Mapeada oportunidade de indicação.', 'Interesse em cards para reuniões complexas.']
		},
		{
			id: 'grupo-adeo',
			empresa: 'Grupo Adeo',
			pessoa: 'Camila Moreira',
			cargo: 'Head de Experiência do Cliente',
			prioridade: 'baixa',
			score: 58,
			etapa_funil: 'Relacionamento futuro',
			resumo_curto: 'Interesse futuro em consolidar aprendizados de conversas com clientes e parceiros.',
			resumo_completo:
				'A conversa foi positiva, mas o momento é de observação. A área quer acompanhar o produto antes de abrir uma avaliação estruturada.',
			oportunidade: 'Nutrir relacionamento com exemplos de uso para times de experiência e vendas.',
			objecao: 'Prioridade interna está em outros projetos no trimestre atual.',
			proxima_acao: 'Retomar contato em 60 dias com evolução do MVP e novos exemplos.',
			tags: ['nutrição', 'experiência', 'futuro'],
			historico: ['Conversa de descoberta realizada.', 'Sem urgência para reunião técnica.']
		}
	];

	let searchTerm = $state('');
	let priorityFilter = $state<Priority | 'todas'>('todas');
	let savedCards = $state<CRMCard[]>([]);
	let apiCards = $state<CRMCard[]>([]);
	let apiMessage = $state('');

	onMount(() => {
		savedCards = getSavedCards();
	});

	let savedCardIds = $derived(new Set(savedCards.map((card) => card.id)));
	let apiCardIds = $derived(new Set(apiCards.map((card) => card.id)));
	let allCards = $derived([...mockedCards, ...savedCards, ...apiCards]);

	let filteredCards = $derived(
		allCards.filter((card) => {
			const term = searchTerm.trim().toLowerCase();
			const matchesTerm =
				term.length === 0 ||
				card.empresa.toLowerCase().includes(term) ||
				card.pessoa.toLowerCase().includes(term) ||
				card.tags.some((tag) => tag.toLowerCase().includes(term));
			const matchesPriority = priorityFilter === 'todas' || card.prioridade === priorityFilter;

			return matchesTerm && matchesPriority;
		})
	);

	function cardsByStage(stage: FunnelStage) {
		return filteredCards.filter((card) => card.etapa_funil === stage);
	}

	function clearLocalCards() {
		clearSavedCards();
		savedCards = [];
	}

	async function loadApiCards() {
		apiCards = await fetchApiCards();
		apiMessage = `${apiCards.length} cards carregados da API experimental.`;
	}

	async function clearExperimentalApiCards() {
		await clearApiCards();
		apiCards = [];
		apiMessage = 'Cards da API experimental removidos da tela.';
	}
</script>

<svelte:head>
	<title>CRM Falado | Funil</title>
	<meta name="description" content="Funil CRM mockado com cards inteligentes do CRM Falado." />
</svelte:head>

<main class="funnel-page">
	<section class="hero" aria-labelledby="page-title">
		<nav class="nav-links" aria-label="Navegação principal">
			<a class="back-link" href="/">← Voltar para início</a>
			<a class="back-link" href="/new">Criar novo card</a>
		</nav>
		<div>
			<p class="eyebrow">Sprint 2 · Funil CRM</p>
			<h1 id="page-title">Cards mockados organizados por etapa do funil.</h1>
			<p class="intro">
				Busque por empresa, pessoa ou tag e filtre por prioridade sem integrar banco, IA ou drag and drop.
			</p>
		</div>
	</section>

	<section class="filters" aria-label="Filtros do funil">
		<label>
			<span>Busca</span>
			<input bind:value={searchTerm} type="search" placeholder="Empresa, pessoa ou tag" />
		</label>
		<label>
			<span>Prioridade</span>
			<select bind:value={priorityFilter}>
				<option value="todas">Todas</option>
				<option value="alta">Alta</option>
				<option value="media">Média</option>
				<option value="baixa">Baixa</option>
			</select>
		</label>
		<p>{filteredCards.length} cards encontrados</p>
		{#if savedCards.length > 0}
			<button class="clear-saved" type="button" onclick={clearLocalCards}>Limpar cards salvos</button>
		{/if}
	</section>

	<section class="persistence-experiments" aria-label="Experimentos de persistência">
		<div>
			<p class="experiment-title">Experimentos de persistência</p>
			<p class="experiment-copy">API temporária em memória para preparar a futura integração com Turso.</p>
		</div>
		<div class="experiment-actions">
			<button type="button" onclick={loadApiCards}>Carregar cards da API experimental</button>
			<button type="button" onclick={clearExperimentalApiCards}>Limpar cards da API</button>
		</div>
		{#if apiMessage}
			<p class="api-message">{apiMessage}</p>
		{/if}
	</section>

	<section class="funnel-board" aria-label="Colunas do funil CRM">
		{#each stages as stage}
			<FunnelColumn {stage} cards={cardsByStage(stage)} {savedCardIds} {apiCardIds} />
		{/each}
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

	.funnel-page {
		min-height: 100vh;
		overflow-x: hidden;
		padding: clamp(1rem, 4vw, 2rem);
		background:
			radial-gradient(circle at 12% 10%, rgba(125, 163, 229, 0.35), transparent 22rem),
			linear-gradient(120deg, #eef5ff 0%, #d7e5ff 62%, #eaf8ff 100%);
	}

	.hero {
		display: grid;
		max-width: 1180px;
		margin: 0 auto 1.5rem;
		gap: 1.5rem;
	}

	.nav-links {
		display: flex;
		width: fit-content;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.back-link {
		width: fit-content;
		border-radius: 999px;
		padding: 0.65rem 0.9rem;
		background: #ffffff;
		color: #22325f;
		font-weight: 900;
		text-decoration: none;
		box-shadow: 0 10px 30px rgba(32, 45, 84, 0.1);
	}

	.eyebrow {
		margin: 0 0 0.75rem;
		font-size: 0.85rem;
		font-weight: 900;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #4c63f2;
	}

	h1 {
		max-width: 900px;
		margin: 0;
		font-size: clamp(2.4rem, 7vw, 5rem);
		line-height: 0.96;
		letter-spacing: -0.07em;
	}

	.intro {
		max-width: 720px;
		margin: 1rem 0 0;
		font-size: 1.08rem;
		line-height: 1.7;
		color: #273858;
	}

	.persistence-experiments,
	.filters {
		display: flex;
		max-width: 1180px;
		margin: 0 auto 1.25rem;
		align-items: end;
		gap: 1rem;
		flex-wrap: wrap;
		border: 1px solid rgba(74, 93, 142, 0.16);
		border-radius: 1.25rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.72);
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-weight: 900;
		color: #22325f;
	}

	button.clear-saved,
	.experiment-actions button,
	input,
	select {
		width: min(78vw, 320px);
		border: 1px solid rgba(74, 93, 142, 0.25);
		border-radius: 0.9rem;
		padding: 0.8rem 0.9rem;
		background: #fff;
		font: inherit;
		color: #14213d;
	}

	.persistence-experiments {
		align-items: center;
	}

	.experiment-title,
	.experiment-copy,
	.api-message {
		margin: 0;
	}

	.experiment-title {
		font-weight: 900;
		color: #22325f;
	}

	.experiment-copy,
	.api-message {
		font-size: 0.9rem;
		font-weight: 800;
		color: #52627f;
	}

	.experiment-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.experiment-actions button {
		width: auto;
	}

	.filters p {
		margin: 0 0 0.8rem auto;
		font-weight: 900;
		color: #4b5b78;
	}

	.funnel-board {
		display: flex;
		max-width: 100%;
		min-width: 0;
		gap: 1rem;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-behavior: smooth;
		padding: 0.25rem max(0.25rem, calc((100vw - 1180px) / 2)) 1rem;
	}

	@media (max-width: 720px) {
		.funnel-page {
			padding: 1rem 0.75rem;
		}

		.filters p {
			width: 100%;
			margin-left: 0;
		}
	}

</style>

<script lang="ts">
	import CardCRM from '$lib/components/CardCRM.svelte';
	import type { CRMCard } from '$lib/types/crm';

	const dimensaCard: CRMCard = {
		empresa: 'Dimensa',
		pessoa: 'Marina Costa',
		cargo: 'Diretora de Transformação Digital',
		prioridade: 'Alta',
		score: 92,
		etapa_funil: 'Proposta',
		resumo_curto:
			'Conta estratégica avaliando automação de relacionamento para reduzir ruído entre vendas e pós-venda.',
		tags: ['Fintech', 'Enterprise', 'Cross-sell', 'Q3'],
		historico: [
			'12/06: Marina pediu uma visão executiva sobre cards gerados a partir de conversas comerciais.',
			'18/06: Time de vendas demonstrou interesse em priorização automática por score.',
			'25/06: Dimensa sinalizou orçamento reservado para piloto com três squads comerciais.',
			'02/07: Objeção principal foi governança dos dados e revisão humana antes do CRM oficial.',
			'07/07: Próximo comitê interno deve validar escopo do MVP e critérios de sucesso.'
		],
		resumo_completo:
			'Dimensa busca centralizar sinais de reuniões, mensagens e follow-ups para transformar conversas em cards acionáveis no CRM, mantendo rastreabilidade e controle humano.',
		oportunidade:
			'Piloto com squads comerciais pode provar ganho de produtividade e abrir expansão para áreas de atendimento e sucesso do cliente.',
		objecao:
			'Precisa de clareza sobre segurança, qualidade dos resumos e etapa de aprovação antes de sincronizar dados sensíveis.',
		proxima_acao:
			'Enviar proposta do piloto com fluxo sem IA integrada ao banco, critérios de validação e exemplo visual do card colecionável.'
	};
</script>

<svelte:head>
	<title>CRM Falado | Card Dimensa</title>
	<meta
		name="description"
		content="MVP visual do CRM Falado com card colecionável de frente e verso."
	/>
</svelte:head>

<main class="page">
	<section class="hero">
		<p class="eyebrow">Sprint 1 · Card visual</p>
		<h1>CRM Falado transforma conversas em cards inteligentes.</h1>
		<p>
			Mock visual da Dimensa para validar a experiência de uma carta colecionável com frente,
			verso e informações comerciais acionáveis.
		</p>
	</section>

	<CardCRM card={dimensaCard} />
</main>

<style>
	:global(body) {
		margin: 0;
		background: #e0f2fe;
		color: #0f172a;
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.page {
		display: grid;
		min-height: 100vh;
		place-items: center;
		gap: 3rem;
		padding: 3rem 1.25rem;
		background:
			radial-gradient(circle at 15% 20%, rgba(59, 130, 246, 0.2), transparent 30%),
			linear-gradient(135deg, #f8fafc 0%, #dbeafe 45%, #bfdbfe 100%);
	}

	.hero {
		max-width: 42rem;
		text-align: center;
	}

	.eyebrow,
	h1,
	.hero p {
		margin: 0;
	}

	.eyebrow {
		color: #2563eb;
		font-size: 0.8rem;
		font-weight: 900;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	h1 {
		margin-top: 0.7rem;
		font-size: clamp(2.4rem, 7vw, 5rem);
		line-height: 0.94;
		letter-spacing: -0.08em;
	}

	.hero p:not(.eyebrow) {
		margin-top: 1rem;
		color: #334155;
		font-size: 1.08rem;
		line-height: 1.7;
	}

	@media (min-width: 900px) {
		.page {
			grid-template-columns: minmax(0, 1fr) auto;
			padding: 4rem;
		}

		.hero {
			text-align: left;
		}
	}
</style>

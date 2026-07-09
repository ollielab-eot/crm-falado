import type { CRMCard } from '$lib/types';

const normalized = (text: string) => text.toLocaleLowerCase('pt-BR');

const cardsByCompany: Record<string, CRMCard> = {
	dimensa: {
		id: 'preview-dimensa',
		empresa: 'Dimensa',
		pessoa: 'Alexandre Barbosa',
		cargo: 'Diretor de Tecnologia',
		prioridade: 'media',
		score: 72,
		etapa_funil: 'Relacionamento futuro',
		resumo_curto:
			'Contato estratégico em consolidação, sem contratação imediata de parceiros, com potencial futuro.',
		resumo_completo:
			'A conversa indicou que a Dimensa passa por um momento de consolidação e ainda não está contratando novos parceiros. Existe valor em manter relacionamento, retomar em seis meses e buscar indicações para contatos ligados à B3.',
		oportunidade: 'Nutrir relacionamento com tecnologia e mercado financeiro para uma retomada futura.',
		objecao: 'Empresa ainda não está contratando parceiros neste momento de consolidação.',
		proxima_acao: 'Voltar em seis meses e pedir indicações para contatos na B3.',
		tags: ['fintech', 'mercado financeiro', 'B3', 'relacionamento futuro'],
		historico: ['Nota comercial processada por mock local.', 'Retomada sugerida para seis meses.']
	},
	obramax: {
		id: 'preview-obramax',
		empresa: 'Obramax',
		pessoa: 'Paula Andrade',
		cargo: 'Gerente Comercial B2B',
		prioridade: 'media',
		score: 74,
		etapa_funil: 'Novo contato',
		resumo_curto: 'Novo contato B2B interessado em organizar conversas comerciais recorrentes.',
		resumo_completo:
			'Contato com potencial para validar o uso de cards inteligentes no acompanhamento de compradores profissionais, histórico de negociações e próximas ações comerciais.',
		oportunidade: 'Demonstrar captura de histórico e próxima ação para equipes B2B.',
		objecao: 'Ainda não existe orçamento reservado para ferramenta nova.',
		proxima_acao: 'Enviar exemplo visual de card gerado a partir de nota comercial.',
		tags: ['varejo construção', 'b2b', 'novo lead'],
		historico: ['Empresa reconhecida pelo mock local.', 'Aguardando qualificação comercial.']
	},
	vivo: {
		id: 'preview-vivo',
		empresa: 'Vivo',
		pessoa: 'Rodrigo Primo',
		cargo: 'Pessoa principal da agenda · Vivo',
		prioridade: 'alta',
		score: 96,
		etapa_funil: 'Qualificar',
		resumo_curto: 'Agenda multicloud e governança com potencial para cards por jornada de execução.',
		resumo_completo:
			'Conversa sugere uma oportunidade de organizar temas como Multicloud, FinOps, Managed Services, Dados e IA em cards acionáveis com responsáveis, evidências e próximos passos.',
		oportunidade: 'Estruturar backlog, critérios de aceite e evidências de execução.',
		objecao: 'Validar pontos focais por tema antes da operação.',
		proxima_acao: 'Confirmar matriz de responsáveis e temas prioritários dos primeiros 30 dias.',
		tags: ['multicloud', 'finops', 'governança'],
		historico: ['Empresa reconhecida pelo mock local.', 'Prioridade alta para qualificação.']
	},
	tdw: {
		id: 'preview-tdw',
		empresa: 'TDW',
		pessoa: 'Fernando Cristino',
		cargo: 'Executivo de Contas',
		prioridade: 'media',
		score: 81,
		etapa_funil: 'Indicação / Rede',
		resumo_curto: 'Parceiro potencial para testar cards como memória comercial em agendas consultivas.',
		resumo_completo:
			'A conversa indica potencial de parceria e uso do CRM Falado para organizar reuniões complexas, stakeholders e recomendações em contas estratégicas.',
		oportunidade: 'Criar caso demonstrativo com agendas consultivas e mapa de stakeholders.',
		objecao: 'Alinhar expectativas porque a geração ainda é mockada nesta sprint.',
		proxima_acao: 'Compartilhar o funil mockado e coletar feedback sobre linguagem dos cards.',
		tags: ['parceria', 'consultoria', 'stakeholders'],
		historico: ['Empresa reconhecida pelo mock local.', 'Possível canal de indicação mapeado.']
	},
	adeo: {
		id: 'preview-adeo',
		empresa: 'Grupo Adeo',
		pessoa: 'Camila Moreira',
		cargo: 'Head de Experiência do Cliente',
		prioridade: 'baixa',
		score: 58,
		etapa_funil: 'Relacionamento futuro',
		resumo_curto: 'Relacionamento futuro para consolidar aprendizados de conversas com clientes e parceiros.',
		resumo_completo:
			'A conversa foi positiva, mas sem urgência imediata. O melhor caminho é nutrir o relacionamento e retomar com exemplos do MVP mais maduros.',
		oportunidade: 'Nutrir relacionamento com exemplos de uso para times de experiência e vendas.',
		objecao: 'Prioridade interna está em outros projetos no trimestre atual.',
		proxima_acao: 'Retomar contato em 60 dias com evolução do MVP e novos exemplos.',
		tags: ['nutrição', 'experiência', 'futuro'],
		historico: ['Empresa reconhecida pelo mock local.', 'Sem urgência para reunião técnica.']
	}
};

const genericCard: CRMCard = {
	id: 'preview-generico',
	empresa: 'Empresa não identificada',
	pessoa: 'Contato não identificado',
	cargo: 'Cargo não identificado',
	prioridade: 'media',
	score: 50,
	etapa_funil: 'Novo contato',
	resumo_curto: 'Nota recebida para análise comercial futura.',
	resumo_completo:
		'O texto informado ainda não contém uma empresa reconhecida pelo mock local. O card foi criado como novo contato para revisão manual.',
	oportunidade: 'Revisar a nota e completar dados de empresa, pessoa e próxima ação.',
	objecao: 'Informações insuficientes para classificar a oportunidade com precisão.',
	proxima_acao: 'Complementar dados do contato e qualificar a conversa.',
	tags: ['novo contato', 'análise pendente'],
	historico: ['Card genérico criado pelo mock local.']
};

export function mockExtractCRM(texto: string): CRMCard {
	const content = normalized(texto);

	if (content.includes('dimensa')) return { ...cardsByCompany.dimensa };
	if (content.includes('obramax')) return { ...cardsByCompany.obramax };
	if (content.includes('vivo')) return { ...cardsByCompany.vivo };
	if (content.includes('tdw')) return { ...cardsByCompany.tdw };
	if (content.includes('adeo') || content.includes('leroy')) return { ...cardsByCompany.adeo };

	return { ...genericCard };
}

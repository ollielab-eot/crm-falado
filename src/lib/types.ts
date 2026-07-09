export type Priority = 'alta' | 'media' | 'baixa';

export type FunnelStage =
	| 'Novo contato'
	| 'Qualificar'
	| 'Oportunidade'
	| 'Relacionamento futuro'
	| 'Indicação / Rede'
	| 'Sem ação';

export type CRMCard = {
	id: string;
	empresa: string;
	pessoa: string;
	cargo: string;
	prioridade: Priority;
	score: number;
	etapa_funil: FunnelStage;
	resumo_curto: string;
	resumo_completo: string;
	oportunidade: string;
	objecao: string;
	proxima_acao: string;
	tags: string[];
	historico: string[];
};

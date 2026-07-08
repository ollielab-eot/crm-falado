export type CRMCard = {
	empresa: string;
	pessoa: string;
	cargo: string;
	prioridade: 'Alta' | 'Média' | 'Baixa';
	score: number;
	etapa_funil: string;
	resumo_curto: string;
	tags: string[];
	historico: string[];
	resumo_completo: string;
	oportunidade: string;
	objecao: string;
	proxima_acao: string;
};

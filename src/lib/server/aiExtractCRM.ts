import OpenAI from 'openai';
import { env } from '$env/dynamic/private';
import type { CRMCard, FunnelStage, Priority } from '$lib/types';

const VALID_PRIORITIES: Priority[] = ['alta', 'media', 'baixa'];
const VALID_FUNNEL_STAGES: FunnelStage[] = [
	'Novo contato',
	'Qualificar',
	'Oportunidade',
	'Relacionamento futuro',
	'Indicação / Rede',
	'Sem ação'
];

const DEFAULT_CARD: CRMCard = {
	id: '',
	empresa: 'Empresa não identificada',
	pessoa: 'Contato não identificado',
	cargo: '',
	prioridade: 'media',
	score: 0,
	etapa_funil: 'Sem ação',
	resumo_curto: '',
	resumo_completo: '',
	oportunidade: '',
	objecao: '',
	proxima_acao: '',
	tags: [],
	historico: []
};

function createCardId() {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return `ai-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function asString(value: unknown, fallback = '') {
	return typeof value === 'string' ? value.trim() : fallback;
}

function asStringArray(value: unknown) {
	if (!Array.isArray(value)) {
		return [];
	}

	return value.map((item) => asString(item)).filter(Boolean);
}

function normalizePriority(value: unknown): Priority {
	const normalized = asString(value).toLowerCase();

	if (VALID_PRIORITIES.includes(normalized as Priority)) {
		return normalized as Priority;
	}

	return DEFAULT_CARD.prioridade;
}

function normalizeFunnelStage(value: unknown): FunnelStage {
	const stage = VALID_FUNNEL_STAGES.find((validStage) => validStage === asString(value));

	return stage ?? DEFAULT_CARD.etapa_funil;
}

function normalizeScore(value: unknown) {
	const score = Number(value);

	if (!Number.isFinite(score)) {
		return DEFAULT_CARD.score;
	}

	return Math.min(100, Math.max(0, Math.round(score)));
}

function parseAiJson(content: string) {
	try {
		return JSON.parse(content) as Record<string, unknown>;
	} catch {
		const jsonMatch = content.match(/\{[\s\S]*\}/);

		if (!jsonMatch) {
			throw new Error('A IA não retornou um JSON válido.');
		}

		return JSON.parse(jsonMatch[0]) as Record<string, unknown>;
	}
}

function sanitizeCard(rawCard: Record<string, unknown>): CRMCard {
	const resumoCurto = asString(rawCard.resumo_curto, DEFAULT_CARD.resumo_curto).slice(0, 180);

	return {
		id: asString(rawCard.id) || createCardId(),
		empresa: asString(rawCard.empresa, DEFAULT_CARD.empresa) || DEFAULT_CARD.empresa,
		pessoa: asString(rawCard.pessoa, DEFAULT_CARD.pessoa) || DEFAULT_CARD.pessoa,
		cargo: asString(rawCard.cargo, DEFAULT_CARD.cargo),
		prioridade: normalizePriority(rawCard.prioridade),
		score: normalizeScore(rawCard.score),
		etapa_funil: normalizeFunnelStage(rawCard.etapa_funil),
		resumo_curto: resumoCurto,
		resumo_completo: asString(rawCard.resumo_completo, DEFAULT_CARD.resumo_completo),
		oportunidade: asString(rawCard.oportunidade, DEFAULT_CARD.oportunidade),
		objecao: asString(rawCard.objecao, DEFAULT_CARD.objecao),
		proxima_acao: asString(rawCard.proxima_acao, DEFAULT_CARD.proxima_acao),
		tags: asStringArray(rawCard.tags),
		historico: asStringArray(rawCard.historico)
	};
}

export async function aiExtractCRM(text: string): Promise<CRMCard> {
	const normalizedText = text.trim();

	if (!normalizedText) {
		throw new Error('Informe um texto comercial para extrair o card.');
	}

	if (!env.OPENAI_API_KEY) {
		throw new Error('OPENAI_API_KEY não configurada.');
	}

	const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
	const response = await openai.chat.completions.create({
		model: 'gpt-4.1-mini',
		response_format: { type: 'json_object' },
		messages: [
			{
				role: 'system',
				content:
					'Você é um assistente especialista em CRM consultivo B2B. Extraia somente informações presentes no texto, sem inventar dados. Retorne exclusivamente JSON compatível com CRMCard, com os campos: empresa, pessoa, cargo, prioridade, score, etapa_funil, resumo_curto, resumo_completo, oportunidade, objecao, proxima_acao, tags, historico. Se não identificar empresa, use "Empresa não identificada". Se não identificar pessoa, use "Contato não identificado". prioridade deve ser alta, media ou baixa. etapa_funil deve ser uma das opções: Novo contato, Qualificar, Oportunidade, Relacionamento futuro, Indicação / Rede, Sem ação. resumo_curto deve ter no máximo 180 caracteres. score deve ser número entre 0 e 100. tags e historico devem ser arrays de strings.'
			},
			{
				role: 'user',
				content: normalizedText
			}
		]
	});

	const content = response.choices[0]?.message?.content;

	if (!content) {
		throw new Error('A IA não retornou conteúdo para o card.');
	}

	return sanitizeCard(parseAiJson(content));
}

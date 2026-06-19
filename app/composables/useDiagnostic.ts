import { ref, computed } from 'vue'

export interface Option {
  text: string
  score: number
}

export interface Question {
  q: string
  o: [string, number][] // [optionText, score]
}

export interface Category {
  id: string
  name: string
  short: string
  icon: string
  color: string
  feature: string
  solution: string
  questions: Question[]
}

export interface Answer {
  i: number
  score: number
}

export interface Lead {
  nome: string
  empresa: string
  wpp: string
  seg: string
  funcionarios: string
  faturamento: string
}

// Config variables matching original js
export const CONFIG = {
  whatsappNumber: "5581981211823",
  leadWebhookUrl: "https://back4.legendaryhub.com.br/api/webhooks/6ec2ca8a-ad59-43bd-a1b9-0d49930585b1"
}

export const IC = {
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h6"/>',
  funnel: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  bolt: '<path d="M13 2L3 14h9l-1 8 10-12h-9L13 2z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="16" cy="8" r="3"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M12 17V5"/><path d="M6 17v-4"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  spark: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5 5 3Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"/>',
  zap: '<path d="M13 2L3 14h9l-1 8 10-12h-9L13 2z"/>'
}


export const CATS: Category[] = [
  {
    id: 'atendimento',
    name: 'Atendimento & WhatsApp',
    short: 'Atendimento',
    icon: IC.chat,
    color: '#4B7FFF',
    feature: 'WhatsApp Multiatendente',
    solution: 'Vários atendentes no <b>mesmo número</b>, com histórico unificado e nada se perdendo — o coração da Legendary Hub.',
    questions: [
      {
        q: 'Como sua empresa atende os clientes no WhatsApp hoje?',
        o: [
          ['WhatsApp comum, no celular de uma pessoa', 0],
          ['Vários números/celulares separados', 1],
          ['WhatsApp Web compartilhado na equipe', 2],
          ['Plataforma com vários atendentes no mesmo número', 3]
        ]
      },
      {
        q: 'Qual é o tempo médio de resposta a um novo contato?',
        o: [
          ['Mais de 1 hora (às vezes só no dia seguinte)', 0],
          ['Entre 15 e 60 minutos', 1],
          ['Menos de 15 min no horário comercial', 2],
          ['Resposta imediata e automática, 24/7', 3]
        ]
      },
      {
        q: 'Com que frequência mensagens ficam sem resposta ou se perdem?',
        o: [
          ['Toda semana perdemos contatos', 0],
          ['Acontece com frequência', 1],
          ['Raramente', 2],
          ['Nunca — todo contato é registrado', 3]
        ]
      },
      {
        q: 'Vários atendentes conseguem usar o mesmo número ao mesmo tempo?',
        o: [
          ['Não, só uma pessoa por vez', 0],
          ['Revezamos o mesmo aparelho', 1],
          ['Parcialmente, com gambiarras', 2],
          ['Sim, simultâneos e com histórico único', 3]
        ]
      },
      {
        q: 'Você vê todo o histórico de conversa de um cliente em um só lugar?',
        o: [
          ['Não, fica espalhado em vários celulares', 0],
          ['Só no aparelho de quem atendeu', 1],
          ['Em parte', 2],
          ['Sim, centralizado e pesquisável', 3]
        ]
      }
    ]
  },
  {
    id: 'leads',
    name: 'Gestão de Leads & Funil',
    short: 'Funil',
    icon: IC.funnel,
    color: '#FFB946',
    feature: 'CRM Kanban Visual',
    solution: 'Um <b>funil visual</b> onde cada lead tem um lugar — você enxerga gargalos e nunca mais perde uma venda por esquecimento.',
    questions: [
      {
        q: 'Você usa um CRM para organizar leads e clientes?',
        o: [
          ['Não, está tudo na cabeça e no WhatsApp', 0],
          ['Planilhas de Excel', 1],
          ['Um CRM básico, pouco usado', 2],
          ['CRM completo usado por toda a equipe', 3]
        ]
      },
      {
        q: 'Você sabe exatamente em que etapa do funil cada lead está?',
        o: [
          ['Não faço ideia', 0],
          ['Mais ou menos, de cabeça', 1],
          ['Anotado em algum lugar', 2],
          ['Sim, num funil visual em tempo real', 3]
        ]
      },
      {
        q: 'Quantos leads você acredita perder por falta de follow-up?',
        o: [
          ['Muitos — a maioria esfria', 0],
          ['Uma boa parte', 1],
          ['Poucos', 2],
          ['Quase nenhum — o follow-up é garantido', 3]
        ]
      },
      {
        q: 'Você consegue medir sua taxa de conversão (lead → venda)?',
        o: [
          ['Não tenho esse número', 0],
          ['Estimo por alto', 1],
          ['Calculo manualmente às vezes', 2],
          ['Acompanho automaticamente em tempo real', 3]
        ]
      },
      {
        q: 'Quando um vendedor sai, o histórico dos leads dele se perde?',
        o: [
          ['Sim, perdemos tudo', 0],
          ['Boa parte se perde', 1],
          ['Recuperamos com esforço', 2],
          ['Não — fica tudo registrado na plataforma', 3]
        ]
      }
    ]
  },
  {
    id: 'automacao',
    name: 'Automação & Processos',
    short: 'Automação',
    icon: IC.bolt,
    color: '#34D399',
    feature: 'ChatBot + Follow-up Automático',
    solution: '<b>Chatbot visual</b> que qualifica sozinho, follow-ups automáticos e campanhas em massa — sua operação vendendo 24h sem esforço.',
    questions: [
      {
        q: 'Quantas tarefas repetitivas sua equipe faz manualmente por dia?',
        o: [
          ['Quase tudo é manual', 0],
          ['Muitas', 1],
          ['Algumas', 2],
          ['Pouquíssimas — o sistema cuida do repetitivo', 3]
        ]
      },
      {
        q: 'Você tem follow-ups automáticos para quem não respondeu?',
        o: [
          ['Não, depende de alguém lembrar', 0],
          ['Às vezes, manualmente', 1],
          ['Alguns automáticos básicos', 2],
          ['Sim, sequências automáticas completas', 3]
        ]
      },
      {
        q: 'Você usa chatbot para responder dúvidas frequentes?',
        o: [
          ['Não, tudo é humano', 0],
          ['Só uma mensagem automática simples', 1],
          ['Chatbot básico', 2],
          ['Chatbot visual que qualifica e encaminha', 3]
        ]
      },
      {
        q: 'Como os novos leads são distribuídos entre os atendentes?',
        o: [
          ['Quem pega primeiro — desorganizado', 0],
          ['Manualmente, por um gestor', 1],
          ['Por uma regra simples', 2],
          ['Distribuição automática e inteligente', 3]
        ]
      },
      {
        q: 'Você consegue disparar campanhas em massa segmentadas?',
        o: [
          ['Não consigo', 0],
          ['Envio manual, um a um', 1],
          ['Listas de transmissão limitadas', 2],
          ['Campanhas segmentadas e automáticas', 3]
        ]
      }
    ]
  },
  {
    id: 'equipe',
    name: 'Equipe & Produtividade',
    short: 'Equipe',
    icon: IC.users,
    color: '#FF8A5C',
    feature: 'Painel de Atendentes',
    solution: 'Um <b>painel ao vivo</b> mostrando a carga de cada atendente, transferências sem perder contexto e a equipe operando 100% na nuvem.',
    questions: [
      {
        q: 'Você sabe quantos atendimentos cada pessoa faz por dia?',
        o: [
          ['Não tenho ideia', 0],
          ['Só uma noção vaga', 1],
          ['Calculo manualmente', 2],
          ['Sim, painel em tempo real por atendente', 3]
        ]
      },
      {
        q: 'Como identifica quem está sobrecarregado ou ocioso?',
        o: [
          ['Não consigo identificar', 0],
          ['Pelo achismo', 1],
          ['Perguntando à equipe', 2],
          ['O painel mostra a carga de cada um', 3]
        ]
      },
      {
        q: 'Quanto tempo leva para treinar um novo atendente?',
        o: [
          ['Semanas, e ainda erra muito', 0],
          ['Vários dias', 1],
          ['Alguns dias', 2],
          ['Horas — o processo é guiado pela plataforma', 3]
        ]
      },
      {
        q: 'As conversas são transferidas entre atendentes sem perder o contexto?',
        o: [
          ['Não, o cliente repete tudo de novo', 0],
          ['Com dificuldade', 1],
          ['Em parte', 2],
          ['Sim, com histórico completo', 3]
        ]
      },
      {
        q: 'Sua equipe trabalha de qualquer lugar com a mesma estrutura?',
        o: [
          ['Não, depende do aparelho físico', 0],
          ['Parcialmente', 1],
          ['Com algumas limitações', 2],
          ['Sim, 100% na nuvem', 3]
        ]
      }
    ]
  },
  {
    id: 'dados',
    name: 'Dados & Decisão',
    short: 'Dados',
    icon: IC.chart,
    color: '#6E9BFF',
    feature: 'Dashboard ao Vivo',
    solution: '<b>Dashboard em tempo real</b> com SLA, volume e ROI por canal — você decide com dados, não com achismo.',
    questions: [
      {
        q: 'Você tem um dashboard com os números da operação em tempo real?',
        o: [
          ['Não tenho', 0],
          ['Só relatórios manuais esporádicos', 1],
          ['Algumas métricas soltas', 2],
          ['Dashboard ao vivo completo', 3]
        ]
      },
      {
        q: 'Suas decisões são baseadas em dados ou em intuição?',
        o: [
          ['100% intuição', 0],
          ['Mais intuição que dados', 1],
          ['Equilibrado', 2],
          ['Guiadas por dados', 3]
        ]
      },
      {
        q: 'Você sabe quais canais/campanhas trazem mais retorno?',
        o: [
          ['Não sei', 0],
          ['Tenho suspeitas', 1],
          ['Sei de alguns', 2],
          ['Sei o ROI exato de cada um', 3]
        ]
      },
      {
        q: 'Você acompanha o SLA (tempo de resposta e resolução)?',
        o: [
          ['Nunca medi', 0],
          ['De vez em quando', 1],
          ['Mais ou menos', 2],
          ['Sim, monitorado automaticamente', 3]
        ]
      },
      {
        q: 'Em quanto tempo você monta um relatório de desempenho?',
        o: [
          ['Levaria dias', 0],
          ['Algumas horas de trabalho', 1],
          ['Consigo montar rápido', 2],
          ['Instantâneo — é só abrir o painel', 3]
        ]
      }
    ]
  }
]

export interface FlatQuestion {
  ci: number
  qi: number
  cat: Category
  q: Question
}

// Flat list of questions
export const FLAT_QUESTIONS: FlatQuestion[] = []
CATS.forEach((cat, ci) => {
  cat.questions.forEach((q, qi) => {
    FLAT_QUESTIONS.push({ ci, qi, cat, q })
  })
})

export interface LevelInfo {
  key: 'critico' | 'risco' | 'evolucao' | 'avancada'
  name: string
  color: string
  bg: string
  verdict: string
}

export function levelFor(pct: number): LevelInfo {
  if (pct <= 40) {
    return {
      key: 'critico',
      name: 'Estado Crítico',
      color: '#FF5C6C',
      bg: 'rgba(255,92,108,.15)',
      verdict: 'Sua operação está perdendo vendas e dinheiro todos os dias. O atendimento depende de pessoas e memória, não de processos — e isso trava o crescimento. A boa notícia: os ganhos com a solução certa são enormes e rápidos.'
    }
  }
  if (pct <= 60) {
    return {
      key: 'risco',
      name: 'Operação em Risco',
      color: '#F5A524',
      bg: 'rgba(245,165,36,.15)',
      verdict: 'Você já vende, mas há gargalos claros segurando seu faturamento. Leads escapam, processos manuais consomem a equipe e faltam dados para decidir. Com poucos ajustes estruturais, dá para destravar um salto de resultado.'
    }
  }
  if (pct <= 80) {
    return {
      key: 'evolucao',
      name: 'Operação em Evolução',
      color: '#4B7FFF',
      bg: 'rgba(75,127,255,.15)',
      verdict: 'Sua base é boa, mas você ainda está deixando dinheiro na mesa. Algumas áreas já rodam bem; outras precisam de automação e visibilidade para você escalar sem aumentar a equipe na mesma proporção.'
    }
  }
  return {
    key: 'avancada',
    name: 'Operação Avançada',
    color: '#34D399',
    bg: 'rgba(52,211,153,.15)',
    verdict: 'Parabéns — sua operação é madura e estruturada. Agora o jogo é refinamento e escala: centralizar tudo numa única plataforma elimina as últimas folgas e multiplica a eficiência do que já funciona.'
  }
}

export function bandColor(pct: number): string {
  return pct <= 40 ? '#FF5C6C' : pct <= 60 ? '#F5A524' : pct <= 80 ? '#4B7FFF' : '#34D399'
}

export function bandTag(pct: number): string {
  return pct <= 40 ? 'Crítico — prioridade máxima' : pct <= 60 ? 'Atenção — gargalo ativo' : pct <= 80 ? 'Bom, dá para melhorar' : 'Forte'
}

export function sevText(pct: number): string {
  return pct <= 40 ? 'Crítico' : 'Atenção'
}

export function sevStyle(pct: number): string {
  return pct <= 40 ? 'background:rgba(255,92,108,.15);color:#FF5C6C' : 'background:rgba(245,165,36,.15);color:#F5A524'
}

export function painLine(id: string, pct: number): string {
  const map: Record<string, [string, string]> = {
    atendimento: [
      'Seu atendimento depende de aparelhos e pessoas específicas — mensagens se perdem e clientes esperam demais.',
      'Há furos no atendimento via WhatsApp que estão deixando clientes sem resposta.'
    ],
    leads: [
      'Sem um funil visual, leads esfriam e vendas são perdidas por puro esquecimento.',
      'Falta visibilidade do funil: você não sabe exatamente onde cada lead está nem por que alguns somem.'
    ],
    automacao: [
      'Sua equipe gasta horas em tarefas repetitivas que poderiam ser 100% automáticas.',
      'Boa parte do follow-up e da qualificação ainda é manual — e o que é manual é esquecido.'
    ],
    equipe: [
      'Você não enxerga a carga real da equipe: uns afogados, outros ociosos, e ninguém sabe ao certo.',
      'Falta visibilidade da produtividade — treinar e distribuir trabalho ainda é no improviso.'
    ],
    dados: [
      'Você decide no escuro: sem dashboard, é difícil saber o que funciona e o que desperdiça verba.',
      'Faltam dados em tempo real para decisões rápidas e para provar o ROI de cada canal.'
    ]
  }
  return (map[id] || ['', ''])[pct <= 40 ? 0 : 1]
}

export function sanitizeBrazilianWhatsapp(phone: string): string {
  let digits = phone.replace(/\D/g, '')

  // Remove leading country code if present to standardize the analysis
  if (digits.startsWith('55') && digits.length >= 12) {
    digits = digits.slice(2)
  }

  // If we don't have enough digits for a Brazilian phone number with DDD, return standard fallback
  if (digits.length < 10) {
    return `55${digits}`
  }

  const ddd = parseInt(digits.slice(0, 2), 10)
  let number = digits.slice(2)

  // WhatsApp 9-digit rule for Brazil:
  // - DDDs 11 to 28: Keep or add the 9-digit prefix (total length 9).
  // - DDDs 31 to 99: Remove the 9-digit prefix if present (total length 8).
  if (ddd >= 11 && ddd <= 28) {
    if (number.length === 8) {
      number = '9' + number
    }
  } else if (ddd >= 31 && ddd <= 99) {
    if (number.length === 9 && number.startsWith('9')) {
      number = number.slice(1)
    }
  }

  return `55${ddd}${number}`
}

export function useDiagnostic() {
  const step = ref<'intro' | 'quiz' | 'lead' | 'loading' | 'results'>('intro')
  const currentIndex = ref(0)
  const answers = ref<Answer[]>([])
  
  const lead = ref<Lead>({
    nome: '',
    empresa: '',
    wpp: '',
    seg: '',
    funcionarios: '',
    faturamento: ''
  })

  const currentQuestion = computed(() => (FLAT_QUESTIONS[currentIndex.value] || FLAT_QUESTIONS[0]) as FlatQuestion)

  const categoryScores = computed(() => {
    return CATS.map((c, ci) => {
      let pts = 0
      for (let qi = 0; qi < 5; qi++) {
        const a = answers.value[ci * 5 + qi]
        pts += a ? a.score : 0
      }
      return {
        cat: c,
        pct: Math.round((pts / 15) * 100)
      }
    })
  })

  const overallScore = computed(() => {
    if (categoryScores.value.length === 0) return 0
    const sum = categoryScores.value.reduce((s, x) => s + x.pct, 0)
    return Math.round(sum / categoryScores.value.length)
  })

  const maturityLevel = computed(() => levelFor(overallScore.value))

  const weakAreas = computed(() => {
    return categoryScores.value
      .filter((x) => x.pct < 70)
      .sort((a, b) => a.pct - b.pct)
  })

  const strongAreas = computed(() => {
    return categoryScores.value
      .filter((x) => x.pct >= 70)
      .sort((a, b) => b.pct - a.pct)
  })

  const savingsText = computed(() => {
    const sav: Record<string, string> = {
      critico: '🚨 Operações nesse nível costumam perder 30%+ das vendas por falhas de processo',
      risco: '💸 Cada lead sem follow-up é dinheiro saindo pela porta todo mês',
      evolucao: '📈 Pequenos ajustes aqui podem destravar um salto de faturamento',
      avancada: '⚡ Unificar tudo numa plataforma elimina as últimas folgas de eficiência'
    }
    return sav[maturityLevel.value.key] || ''
  })

  const whatsappMessage = computed(() => {
    let m = 'Olá! Acabei de fazer o Diagnóstico da Legendary Hub.\n\n'
    m += `👤 ${lead.value.nome} — ${lead.value.empresa}${lead.value.seg ? ` (${lead.value.seg})` : ''}\n`
    m += `📊 Maturidade: ${overallScore.value}% — ${maturityLevel.value.name}\n\n`
    m += 'Áreas por desempenho:\n'
    categoryScores.value.forEach((x) => {
      m += `• ${x.cat.name}: ${x.pct}%\n`
    })
    if (weakAreas.value.length) {
      m += `\nMeus maiores gargalos: ${weakAreas.value.slice(0, 3).map((w) => w.cat.name).join(', ')}.\n`
    }
    m += '\nQuero entender como a Legendary Hub pode resolver isso. Podemos conversar?'
    return m
  })

  const whatsappUrl = computed(() => {
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage.value)}`
  })

  function start() {
    currentIndex.value = 0
    answers.value = []
    step.value = 'quiz'
  }

  function answer(optionIndex: number, score: number) {
    answers.value[currentIndex.value] = { i: optionIndex, score }
    
    // Smooth transition
    setTimeout(() => {
      if (currentIndex.value < FLAT_QUESTIONS.length - 1) {
        currentIndex.value++
      } else {
        step.value = 'lead'
      }
    }, 260)
  }

  function back() {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  function submitLead(data: Lead) {
    lead.value = data
    maybeWebhook()
    step.value = 'loading'
  }

  function completeLoading() {
    step.value = 'results'
  }

  function maybeWebhook() {
    try {
      const sanitizedWhatsapp = sanitizeBrazilianWhatsapp(lead.value.wpp)
      const scoreVal = overallScore.value

      fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Portuguese keys
          nome: lead.value.nome,
          empresa: lead.value.empresa,
          wpp: sanitizedWhatsapp,
          whatsapp: sanitizedWhatsapp,
          seg: lead.value.seg,
          funcionarios: lead.value.funcionarios,
          faturamento: lead.value.faturamento,
          
          // English/Standard keys for CRM integrations
          name: lead.value.nome,
          firstName: lead.value.nome,
          first_name: lead.value.nome,
          company: lead.value.empresa,
          companyName: lead.value.empresa,
          company_name: lead.value.empresa,
          phone: sanitizedWhatsapp,
          phone_number: sanitizedWhatsapp,
          phoneNumber: sanitizedWhatsapp,
          telefone: sanitizedWhatsapp,
          segment: lead.value.seg,
          employees: lead.value.funcionarios,
          revenue: lead.value.faturamento,

          // Overall Score formats
          overall: scoreVal,
          overallScore: scoreVal,
          overall_score: scoreVal,
          score: scoreVal,
          porcentagem: scoreVal,
          percentage: scoreVal,
          resultado: scoreVal,
          overall_percent: `${scoreVal}%`,
          porcentagem_percent: `${scoreVal}%`,
          score_percent: `${scoreVal}%`,
          overall_str: scoreVal.toString(),
          porcentagem_str: scoreVal.toString(),
          score_str: scoreVal.toString(),

          // Metadata
          scores: categoryScores.value.map((x) => ({ area: x.cat.name, pct: x.pct })),
          date: new Date().toISOString()
        })
      }).catch(() => {})
    } catch (e) {}
  }

  function restart() {
    currentIndex.value = 0
    answers.value = []
    lead.value = { nome: '', empresa: '', wpp: '', seg: '', funcionarios: '', faturamento: '' }
    step.value = 'intro'
  }

  return {
    step,
    currentIndex,
    answers,
    lead,
    currentQuestion,
    categoryScores,
    overallScore,
    maturityLevel,
    weakAreas,
    strongAreas,
    savingsText,
    whatsappUrl,
    start,
    answer,
    back,
    submitLead,
    completeLoading,
    restart
  }
}

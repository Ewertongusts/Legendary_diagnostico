<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  type Category,
  type LevelInfo,
  bandColor,
  bandTag,
  sevText,
  sevStyle,
  painLine,
  IC
} from '~/composables/useDiagnostic'

const props = defineProps<{
  lead: { nome: string; empresa: string; wpp: string; seg: string }
  categoryScores: { cat: Category; pct: number }[]
  overallScore: number
  maturityLevel: LevelInfo
  weakAreas: { cat: Category; pct: number }[]
  strongAreas: { cat: Category; pct: number }[]
  savingsText: string
  whatsappUrl: string
  onRestart: () => void
}>()

const strokeDashoffset = ref(565.4866)
const animatedScore = ref(0)
const barWidths = ref<string[]>(props.categoryScores.map(() => '0%'))

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

onMounted(() => {
  // Animate SVG gauge circle
  setTimeout(() => {
    strokeDashoffset.value = 565.4866 * (1 - props.overallScore / 100)
  }, 200)

  // Increment overall score text
  const target = props.overallScore
  if (target > 0) {
    const interval = setInterval(() => {
      animatedScore.value += Math.ceil((target - animatedScore.value) / 6) || 1
      if (animatedScore.value >= target) {
        animatedScore.value = target
        clearInterval(interval)
      }
    }, 45)
  }

  // Animate categories progress bars
  setTimeout(() => {
    barWidths.value = props.categoryScores.map((x) => `${x.pct}%`)
  }, 350)
})
</script>

<template>
  <div class="bg-gradient-to-b from-brand-surface to-brand-bg2 border border-brand-border rounded-[18px] shadow-brand overflow-hidden animate-rise">
    
    <!-- Hero Score Section -->
    <div class="text-center p-[36px] px-[20px] sm:px-[32px] pb-[28px] border-b border-brand-border">
      <div class="text-[11px] tracking-widest text-brand-muted2 font-semibold uppercase mb-[6px]">
        Diagnóstico de Atendimento &amp; Vendas
      </div>
      <div class="font-space font-bold text-2xl mb-[22px] text-brand-text">
        {{ lead.empresa }}
      </div>
      
      <!-- SVG Gauge -->
      <div class="relative w-[210px] h-[210px] mx-auto mb-[18px]">
        <svg width="210" height="210" viewBox="0 0 210 210" class="rotate-[-90deg]">
          <circle 
            class="fill-none stroke-brand-border stroke-[14]" 
            cx="105" 
            cy="105" 
            r="90" 
          />
          <circle 
            class="fill-none stroke-[14] stroke-linecap-round transition-all duration-[1.4s] ease-[cubic-bezier(0.16,0.84,0.44,1)]" 
            cx="105" 
            cy="105" 
            r="90"
            :stroke="maturityLevel.color"
            stroke-dasharray="565.4866"
            :stroke-dashoffset="strokeDashoffset"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="font-space font-bold text-[46px] leading-none text-brand-text">
            {{ animatedScore }}%
          </span>
          <span class="text-xs text-brand-muted2 mt-0.5">maturidade</span>
        </div>
      </div>

      <!-- Level Badge -->
      <div>
        <span 
          class="inline-block font-space font-bold text-lg px-[22px] py-[9px] rounded-[30px] mt-[4px]"
          :style="{ color: maturityLevel.color, background: maturityLevel.bg }"
        >
          {{ maturityLevel.name }}
        </span>
      </div>

      <p class="text-brand-muted text-base max-w-[540px] mx-auto mt-[16px] leading-relaxed">
        <b :style="{ color: maturityLevel.color }">{{ lead.nome }}</b>, {{ maturityLevel.verdict }}
      </p>
    </div>

    <!-- Category Bars Section -->
    <div class="p-[30px] px-[20px] sm:px-[32px] border-b border-brand-border/40">
      <h3 class="font-space font-semibold text-base tracking-[0.3px] mb-[4px] flex items-center gap-[9px] text-brand-text">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[18px] h-[18px] text-brand-blue-soft">
          <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M12 17V5"/><path d="M6 17v-4"/>
        </svg>
        Raio-X por área
      </h3>
      <p class="text-[13px] text-brand-muted2 mb-[20px]">
        Onde sua operação está forte — e onde está perdendo dinheiro.
      </p>
      
      <div class="flex flex-col gap-[16px]">
        <div 
          v-for="(x, idx) in categoryScores" 
          :key="x.cat.id" 
          class="flex flex-col"
        >
          <div class="flex items-center gap-[10px] mb-[8px]">
            <div 
              class="w-[30px] h-[30px] rounded-lg flex items-center justify-center flex-shrink-0"
              :style="{ background: `${bandColor(x.pct)}22`, color: bandColor(x.pct) }"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4" v-html="x.cat.icon">
              </svg>
            </div>
            <span class="text-sm font-semibold text-brand-text">{{ x.cat.name }}</span>
            <span class="ml-auto text-sm font-bold tracking-tight font-space" :style="{ color: bandColor(x.pct) }">
              {{ x.pct }}%
            </span>
          </div>
          <!-- Bar Track & Fill -->
          <div class="h-[9px] bg-brand-bg rounded-md overflow-hidden border border-brand-border">
            <div 
              class="h-full rounded-md transition-all duration-[1.1s] ease-[cubic-bezier(0.16,0.84,0.44,1)]"
              :style="{ 
                width: barWidths[idx], 
                background: `linear-gradient(90deg, ${bandColor(x.pct)}99, ${bandColor(x.pct)})`
              }"
            ></div>
          </div>
          <div class="text-[11.5px] text-brand-muted mt-[7px]">
            {{ bandTag(x.pct) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Action Plan Section -->
    <div class="p-[30px] px-[20px] sm:px-[32px] pb-[28px]">
      <h3 class="font-space font-semibold text-base tracking-[0.3px] mb-[4px] flex items-center gap-[9px] text-brand-text">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[18px] h-[18px] text-brand-blue-soft">
          <path d="M13 2L3 14h9l-1 8 10-12h-9L13 2z" />
        </svg>
        Plano de ação prioritário
      </h3>
      <p class="text-[13px] text-brand-muted2 mb-[20px]">
        Resolva primeiro o que mais impacta seu faturamento.
      </p>

      <!-- Action Items -->
      <div class="flex flex-col gap-[13px]">
        <!-- If no weak areas (< 70%) -->
        <div 
          v-if="weakAreas.length === 0" 
          class="bg-brand-surface2 border border-brand-border border-l-4 border-l-brand-green rounded-[13px] p-[18px] px-[19px]"
        >
          <div class="flex items-center gap-[11px] mb-[9px]">
            <div class="w-[34px] h-[34px] rounded-lg bg-brand-green/15 text-brand-green flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[18px] h-[18px]" v-html="IC.check">
              </svg>
            </div>
            <span class="font-space font-semibold text-[15px] text-brand-text">Operação afiada</span>
          </div>
          <div class="text-[13.5px] text-brand-muted leading-relaxed">
            Todas as áreas estão acima de 70%. O próximo passo é unificar tudo em uma só plataforma para eliminar as últimas folgas e escalar com previsibilidade.
          </div>
        </div>

        <!-- Else weak areas list -->
        <div 
          v-else 
          v-for="x in weakAreas" 
          :key="x.cat.id" 
          class="bg-brand-surface2 border border-brand-border border-l-4 rounded-[13px] p-[18px] px-[19px]"
          :style="{ borderLeftColor: bandColor(x.pct) }"
        >
          <div class="flex items-center gap-[11px] mb-[9px]">
            <div 
              class="w-[34px] h-[34px] rounded-lg flex items-center justify-center flex-shrink-0"
              :style="{ background: `${bandColor(x.pct)}22`, color: bandColor(x.pct) }"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[18px] h-[18px]" v-html="x.cat.icon">
              </svg>
            </div>
            <span class="font-space font-semibold text-[15px] text-brand-text">{{ x.cat.name }}</span>
            <span 
              class="ml-auto text-[10.5px] font-bold tracking-wider px-[9px] py-[4px] rounded-full uppercase"
              :style="sevStyle(x.pct)"
            >
              {{ sevText(x.pct) }}
            </span>
          </div>
          <!-- Pain Description -->
          <div class="text-[13.5px] text-brand-muted leading-relaxed mb-[12px]">
            {{ painLine(x.cat.id, x.pct) }}
          </div>
          <!-- Proposed Solution -->
          <div class="flex gap-[10px] items-start bg-brand-blue/7 border border-brand-blue/20 rounded-lg p-[11px] px-[13px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[17px] h-[17px] text-brand-blue-soft flex-shrink-0 mt-0.5" v-html="IC.spark">
            </svg>
            <div class="text-[13px] leading-relaxed text-brand-text">
              <b class="text-brand-blue-soft font-semibold">{{ x.cat.feature }}:</b>
              <span v-html="x.cat.solution"></span>
            </div>
          </div>
        </div>

        <!-- Strong Area Alert -->
        <div 
          v-if="strongAreas.length > 0" 
          class="flex gap-[11px] items-start bg-brand-green/7 border border-brand-green/22 rounded-xl p-[15px] px-[17px] mt-[6px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[19px] h-[19px] text-brand-green-soft flex-shrink-0 mt-0.5" v-html="IC.check">
          </svg>
          <div class="text-[13.5px] leading-relaxed text-brand-muted">
            <b class="text-brand-green-soft font-semibold">Ponto forte:</b> 
            {{ strongAreas.map(s => s.cat.name).join(', ') }}. Mantenha — e integre com as áreas acima para potencializar ainda mais.
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Block -->
    <div class="m-[6px] mx-[15px] sm:mx-[32px] mb-[34px] bg-gradient-to-br from-[#12203c] to-[#0d1729] border border-brand-border2 rounded-[18px] p-[30px] px-[28px] text-center relative overflow-hidden mt-6">
      <div class="absolute w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(75,127,255,0.18),transparent_70%)] top-[-120px] right-[-80px] pointer-events-none"></div>
      
      <!-- Savings Info -->
      <div class="inline-flex items-center gap-2 bg-brand-gold/12 border border-brand-gold/35 text-brand-gold text-[13px] font-semibold px-[16px] py-[9px] rounded-full mb-[18px] relative">
        {{ savingsText }}
      </div>
      
      <h3 class="font-space font-bold text-[22px] mb-[10px] relative text-brand-text">
        Vamos resolver isso juntos?
      </h3>
      <p class="text-brand-muted text-[14.5px] max-w-[480px] mx-auto mb-[22px] relative leading-relaxed">
        Agende uma demonstração gratuita e veja, na prática, como a Legendary Hub elimina esses gargalos na sua operação.
      </p>
      
      <!-- Action CTAs -->
      <div class="flex gap-[12px] justify-center flex-wrap relative">
        <BaseButton 
          variant="primary"
          as="a"
          href="https://cal.com/legendary-hub-gabriel/60min" 
          target="_blank" 
          rel="noopener"
          size="md"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Agendar demonstração agora
        </BaseButton>
        <BaseButton 
          variant="success"
          as="a"
          :href="whatsappUrl" 
          target="_blank" 
          rel="noopener"
          size="md"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.738-.981zm5.392-1.592" />
          </svg>
          Falar no WhatsApp
        </BaseButton>
        <BaseButton 
          variant="outline"
          as="a"
          href="https://www.legendaryhub.com.br" 
          target="_blank" 
          rel="noopener"
          size="md"
        >
          Conhecer a plataforma
        </BaseButton>
      </div>
    </div>

    <!-- Footer Restart section -->
    <div class="text-center pb-[30px] text-brand-muted2 text-[12.5px] px-[32px]">
      Diagnóstico gerado por Legendary Hub · <span>{{ formattedDate }}</span><br>
      <BaseButton 
        variant="text"
        @click="onRestart" 
        class="underline text-[12.5px] mt-[4px]"
      >
        Refazer o diagnóstico
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.animate-rise {
  animation: rise 0.45s cubic-bezier(0.16, 0.84, 0.44, 1) both;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  onComplete: () => void
}>()

const progress = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const progressText = computed(() => {
  if (progress.value < 25) return 'Analisando dados do atendimento...'
  if (progress.value < 50) return 'Identificando gargalos de follow-up e funil...'
  if (progress.value < 75) return 'Calculando métricas de produtividade...'
  if (progress.value < 100) return 'Estruturando recomendações do plano de ação...'
  return 'Finalizando diagnóstico...'
})

const steps = computed(() => [
  { label: 'Importação das respostas da operação', done: progress.value >= 15 },
  { label: 'Análise de maturidade por canal', done: progress.value >= 40 },
  { label: 'Mapeamento de gargalos e perdas', done: progress.value >= 66 },
  { label: 'Geração do plano de ação estruturado', done: progress.value >= 93 }
])

const currentCheckingIndex = computed(() => {
  return steps.value.findIndex(s => !s.done)
})

onMounted(() => {
  // 15 seconds duration = 15000ms. 
  // 100 steps total, so 150ms per 1%.
  timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value++
    } else {
      if (timer) clearInterval(timer)
      props.onComplete()
    }
  }, 150)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="bg-gradient-to-b from-brand-surface to-brand-bg2 border border-brand-border rounded-[18px] shadow-brand p-[44px] px-[20px] sm:px-[36px] text-center animate-rise flex flex-col items-center">
    <!-- Header -->
    <h2 class="font-space font-bold text-[24px] tracking-tight mb-2 text-brand-text">
      Processando seu Diagnóstico
    </h2>
    <p class="text-brand-muted max-w-[400px] text-sm mb-[32px] leading-relaxed">
      Nossa inteligência artificial está analisando as respostas da sua empresa para mapear seus maiores gargalos.
    </p>

    <!-- Animated Loader Circle -->
    <div class="relative w-[120px] h-[120px] mb-[34px] flex items-center justify-center">
      <!-- Glow background -->
      <div class="absolute inset-[10px] rounded-full bg-brand-blue/8 shadow-[0_0_35px_rgba(75,127,255,0.25)] animate-pulse"></div>
      
      <svg width="120" height="120" viewBox="0 0 120 120" class="rotate-[-90deg] relative z-10">
        <!-- Track circle -->
        <circle 
          class="fill-none stroke-brand-border/40 stroke-[5]" 
          cx="60" 
          cy="60" 
          r="50" 
        />
        <!-- Active progressive line -->
        <circle 
          class="fill-none stroke-[5] stroke-linecap-round transition-all duration-[150ms] ease-linear" 
          cx="60" 
          cy="60" 
          r="50"
          stroke="#4B7FFF"
          stroke-dasharray="314.159"
          :stroke-dashoffset="314.159 * (1 - progress / 100)"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span class="font-space font-bold text-[23px] leading-none text-brand-text">
          {{ progress }}%
        </span>
      </div>
    </div>

    <!-- Progressive Checklists -->
    <div class="w-full max-w-[340px] text-left flex flex-col gap-[12px] bg-brand-surface2/40 border border-brand-border/50 rounded-[14px] p-[20px] px-[22px] mb-[28px]">
      <div 
        v-for="(st, idx) in steps" 
        :key="idx"
        class="flex items-center gap-[12px] transition-all duration-300"
        :class="st.done ? 'text-brand-text' : 'text-brand-muted2'"
      >
        <div class="flex-shrink-0 w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all duration-300"
          :class="st.done ? 'bg-brand-green/12 border-brand-green text-brand-green' : 'border-brand-muted2/50'"
        >
          <svg v-if="st.done" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" class="w-2.5 h-2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span v-else-if="idx === currentCheckingIndex" class="w-[6px] h-[6px] rounded-full bg-brand-blue animate-ping"></span>
        </div>
        <span class="text-[13px] font-medium leading-tight">
          {{ st.label }}
        </span>
      </div>
    </div>

    <!-- Active Action Status Text -->
    <div class="h-[20px] text-xs font-semibold text-brand-blue-soft tracking-wide uppercase transition-all duration-200">
      {{ progressText }}
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

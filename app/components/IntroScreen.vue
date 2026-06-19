<script setup lang="ts">
import { CATS } from '~/composables/useDiagnostic'

defineProps<{
  onStart: () => void
}>()
</script>

<template>
  <div class="bg-gradient-to-b from-brand-surface to-brand-bg2 border border-brand-border rounded-[18px] shadow-brand p-[44px] px-[20px] sm:px-[40px] pb-[40px] text-center animate-rise">
    <!-- Eyebrow -->
    <span class="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-blue-soft bg-brand-blue/10 border border-brand-blue/20 px-[15px] py-[7px] rounded-full mb-[24px] uppercase">
      <span class="w-[7px] h-[7px] rounded-full bg-brand-green shadow-[0_0_0_4px_rgba(34,197,94,0.18)]"></span>
      Análise gratuita · 2 minutos
    </span>

    <!-- Heading -->
    <h1 class="font-space font-bold text-3xl sm:text-[38px] leading-tight sm:leading-[1.08] tracking-tight mb-[16px] text-brand-text">
      Sua operação está <span class="text-brand-blue-soft">vendendo no máximo</span> do potencial?
    </h1>
    
    <p class="text-brand-muted text-base max-w-[520px] mx-auto mb-[30px]">
      Responda 15 perguntas rápidas sobre seu atendimento e vendas. No final, você recebe um diagnóstico completo com os gargalos que estão custando dinheiro — e o caminho para resolver.
    </p>

    <!-- Meta indicators -->
    <div class="flex gap-[26px] justify-center flex-wrap mb-[32px]">
      <div class="flex items-center gap-2 text-[13.5px] text-brand-muted">
        <svg class="w-[18px] h-[18px] text-brand-blue-soft flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <span><b class="text-brand-text font-semibold">2 min</b> para concluir</span>
      </div>
      <div class="flex items-center gap-2 text-[13.5px] text-brand-muted">
        <svg class="w-[18px] h-[18px] text-brand-blue-soft flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        <span><b class="text-brand-text font-semibold">15</b> perguntas</span>
      </div>
      <div class="flex items-center gap-2 text-[13.5px] text-brand-muted">
        <svg class="w-[18px] h-[18px] text-brand-blue-soft flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 3 3 5-6" />
        </svg>
        <span>Diagnóstico <b class="text-brand-text font-semibold">personalizado</b></span>
      </div>
    </div>

    <!-- Category Preview -->
    <div class="grid grid-cols-3 sm:grid-cols-5 gap-[10px] mb-[34px]">
      <div 
        v-for="c in CATS" 
        :key="c.id" 
        class="bg-brand-surface2 border border-brand-border rounded-xl p-[14px] px-2 text-center flex flex-col items-center justify-center"
      >
        <div :style="{ color: c.color }" class="mb-[7px]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[22px] h-[22px]" v-html="c.icon">
          </svg>
        </div>
        <span class="block text-[10.5px] text-brand-muted font-medium leading-tight">
          {{ c.short }}
        </span>
      </div>
    </div>

    <!-- Start Button -->
    <BaseButton 
      @click="onStart" 
      class="w-full sm:w-auto"
    >
      Começar diagnóstico
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="20" height="20">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </BaseButton>
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

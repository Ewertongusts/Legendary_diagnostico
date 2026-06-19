<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { CATS, FLAT_QUESTIONS, type FlatQuestion } from '~/composables/useDiagnostic'

const props = defineProps<{
  currentIndex: number
  currentQuestion: FlatQuestion
  selectedAnswerIndex: number | undefined
  onAnswer: (index: number, score: number) => void
  onBack: () => void
}>()

// Keyboard navigation
function handleKeyDown(e: KeyboardEvent) {
  if (['1', '2', '3', '4'].includes(e.key)) {
    const idx = parseInt(e.key) - 1
    const targetOption = props.currentQuestion.q.o[idx]
    if (targetOption) {
      props.onAnswer(idx, targetOption[1])
    }
  } else if (e.key === 'Backspace') {
    e.preventDefault()
    props.onBack()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="animate-rise">
    <!-- Progress Flow Header -->
    <div class="flex items-center justify-between mb-[26px] relative px-[6px]">
      <!-- Track line -->
      <div class="absolute top-[21px] left-[30px] right-[30px] h-[2px] bg-brand-border z-0">
        <div 
          class="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-blue to-brand-blue-soft shadow-[0_0_10px_rgba(75,127,255,0.7)] transition-all duration-500 ease-[cubic-bezier(0.16,0.84,0.44,1)]"
          :style="{ width: `${(currentQuestion.ci / (CATS.length - 1)) * 100}%` }"
        ></div>
      </div>
      
      <!-- Nodes -->
      <div 
        v-for="(c, i) in CATS" 
        :key="c.id" 
        class="relative z-10 flex flex-col items-center gap-[7px] flex-1"
      >
        <div 
          class="w-[42px] h-[42px] rounded-[13px] border-[1.5px] flex items-center justify-center transition-all duration-350"
          :class="[
            i < currentQuestion.ci 
              ? 'bg-brand-blue/15 border-brand-blue text-brand-blue-soft' 
              : i === currentQuestion.ci
                ? 'bg-gradient-to-br from-brand-blue to-[#5E8BFF] border-brand-blue-soft shadow-[0_0_0_5px_rgba(75,127,255,0.18),0_8px_20px_-6px_rgba(59,110,246,0.7)] text-white'
                : 'bg-brand-surface border-brand-border text-brand-muted2'
          ]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" v-html="c.icon">
          </svg>
        </div>
        <span 
          class="hidden sm:block text-[9.5px] font-semibold text-center tracking-[0.3px] max-w-[74px] leading-[1.2]"
          :class="i <= currentQuestion.ci ? 'text-brand-muted' : 'text-brand-muted2'"
        >
          {{ c.short }}
        </span>
      </div>
    </div>

    <!-- Question Card -->
    <div class="bg-gradient-to-b from-brand-surface to-brand-bg2 border border-brand-border rounded-[18px] shadow-brand">
      <div class="pt-[30px] px-[20px] sm:px-[32px] pb-[28px]">
        <!-- Card Header info -->
        <div class="flex items-center gap-[12px] mb-[6px]">
          <span class="inline-flex items-center gap-[8px] text-xs font-semibold tracking-wider text-brand-blue-soft uppercase">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" v-html="currentQuestion.cat.icon">
            </svg>
            {{ currentQuestion.cat.name }}
          </span>
          <span class="ml-auto text-[12.5px] text-brand-muted2 font-semibold font-mono">
            {{ currentIndex + 1 }} / {{ FLAT_QUESTIONS.length }}
          </span>
        </div>

        <!-- Question text -->
        <div class="font-space font-semibold text-[21px] sm:text-[23px] leading-snug tracking-tight mt-[14px] mb-[22px] text-brand-text">
          {{ currentQuestion.q.q }}
        </div>

        <!-- Options list -->
        <div class="flex flex-col gap-[11px]">
          <button 
            v-for="(opt, idx) in currentQuestion.q.o" 
            :key="idx"
            @click="onAnswer(idx, opt[1])"
            class="group flex items-center gap-[14px] w-full text-left bg-brand-surface2 border-[1.5px] border-brand-border rounded-[13px] p-[15px] px-[17px] cursor-pointer transition-all duration-160 text-brand-text text-[15px] font-inter hover:border-brand-blue-deep hover:bg-[#16243f] hover:translate-x-[3px] focus-visible:outline focus-visible:outline-3 focus-visible:outline-brand-blue-soft focus-visible:outline-offset-2"
            :class="{ 'border-brand-blue bg-brand-blue/12': selectedAnswerIndex === idx }"
          >
            <!-- Key indicator (1-4) -->
            <span 
              class="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-bg border border-brand-border2 flex items-center justify-center text-[13px] font-bold text-brand-muted transition-all duration-160 font-space group-hover:border-brand-blue group-hover:text-brand-blue-soft"
              :class="{ 'bg-brand-blue border-brand-blue text-white': selectedAnswerIndex === idx }"
            >
              {{ idx + 1 }}
            </span>
            {{ opt[0] }}
          </button>
        </div>

        <!-- Footer actions -->
        <div class="flex justify-between items-center mt-[22px]">
          <BaseButton 
            variant="text"
            @click="onBack" 
            :disabled="currentIndex === 0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Voltar
          </BaseButton>
          <span class="text-xs text-brand-muted2 text-right hidden sm:inline">
            Toque numa opção ou use as teclas 1–4 (Backspace volta)
          </span>
        </div>
      </div>
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

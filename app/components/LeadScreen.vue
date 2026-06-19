<script setup lang="ts">
import { ref } from 'vue'
import type { Lead } from '~/composables/useDiagnostic'

const props = defineProps<{
  onSubmit: (data: Lead) => void
}>()

const nome = ref('')
const empresa = ref('')
const wpp = ref('')
const seg = ref('')
const funcionarios = ref('')
const faturamento = ref('')

const errNome = ref(false)
const errEmpresa = ref(false)
const errWpp = ref(false)

const segmentOptions = [
  'Clínica / Saúde / Estética',
  'Imobiliária / Construção',
  'E-commerce / Varejo',
  'Educação / Cursos',
  'Serviços / Agência',
  'Indústria / Distribuição (B2B)',
  'Infoproduto / Mentoria',
  'Outro'
]

const employeeOptions = [
  '1 (Somente eu)',
  '2 a 5 colaboradores',
  '6 a 10 colaboradores',
  '11 a 30 colaboradores',
  'Mais de 30 colaboradores'
]

const revenueOptions = [
  'Até R$ 10.000',
  'De R$ 11.000 a R$ 25.000',
  'De R$ 26.000 a R$ 40.000',
  'De R$ 40.000 a R$ 70.000',
  'Acima de R$ 70.000'
]

function handlePhoneInput(e: Event) {
  const input = e.target as HTMLInputElement
  let raw = input.value.replace(/\D/g, '')
  
  // If the number starts with '55' (country code) and has 12 or more digits (DDD + number), strip '55'
  if (raw.startsWith('55') && raw.length >= 12) {
    raw = raw.slice(2)
  }
  
  if (raw.length > 11) {
    raw = raw.slice(0, 11)
  }
  
  if (raw.length === 0) {
    input.value = ''
  } else if (raw.length <= 2) {
    input.value = `(${raw}`
  } else if (raw.length <= 6) {
    input.value = `(${raw.slice(0, 2)}) ${raw.slice(2)}`
  } else if (raw.length <= 10) {
    input.value = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`
  } else {
    input.value = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`
  }
  wpp.value = input.value
}

function submit() {
  const n = nome.value.trim()
  const emp = empresa.value.trim()
  const phoneDigits = wpp.value.replace(/\D/g, '')
  
  errNome.value = !n
  errEmpresa.value = !emp
  errWpp.value = phoneDigits.length < 10

  if (errNome.value || errEmpresa.value || errWpp.value) {
    return
  }

  props.onSubmit({
    nome: n,
    empresa: emp,
    wpp: wpp.value,
    seg: seg.value,
    funcionarios: funcionarios.value,
    faturamento: faturamento.value
  })
}
</script>

<template>
  <div class="bg-gradient-to-b from-brand-surface to-brand-bg2 border border-brand-border rounded-[18px] shadow-brand p-[38px] px-[20px] sm:px-[36px] animate-rise">
    <!-- Ready Badge -->
    <div class="inline-flex items-center justify-center gap-2.5 bg-brand-green/10 border border-brand-green/30 rounded-xl p-[11px] mb-[24px] w-full text-[13.5px] text-brand-green-soft font-semibold">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18" class="flex-shrink-0">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
      Seu diagnóstico está pronto!
    </div>

    <h2 class="font-space font-bold text-[27px] tracking-tight mb-2 text-center text-brand-text">
      Para onde enviamos seu resultado?
    </h2>
    <p class="text-brand-muted text-center mb-[26px] text-[14.5px]">
      Receba o diagnóstico completo na tela e uma cópia no seu WhatsApp.
    </p>

    <!-- Form -->
    <form @submit.prevent="submit" class="space-y-[15px]">
      <!-- Nome -->
      <BaseInput 
        v-model="nome"
        label="Seu nome"
        placeholder="Como podemos te chamar?"
        autocomplete="name"
        :error="errNome ? 'Digite seu nome.' : false"
      />

      <!-- Empresa -->
      <BaseInput 
        v-model="empresa"
        label="Nome da empresa"
        placeholder="Sua empresa"
        autocomplete="organization"
        :error="errEmpresa ? 'Digite o nome da empresa.' : false"
      />

      <!-- WhatsApp -->
      <BaseInput 
        v-model="wpp"
        @input="handlePhoneInput"
        label="WhatsApp (com DDD)"
        placeholder="(00) 00000-0000"
        autocomplete="tel"
        inputmode="numeric"
        type="tel"
        :error="errWpp ? 'Digite um WhatsApp válido com DDD.' : false"
      />

      <!-- Segmento -->
      <BaseSelect 
        v-model="seg"
        label="Segmento da empresa"
        :options="segmentOptions"
      />

      <!-- Funcionários -->
      <BaseSelect 
        v-model="funcionarios"
        label="Quantidade de funcionários"
        :options="employeeOptions"
        placeholder="Selecione a quantidade…"
      />

      <!-- Faturamento -->
      <BaseSelect 
        v-model="faturamento"
        label="Faturamento mensal estimado"
        :options="revenueOptions"
        placeholder="Selecione o faturamento…"
      />

      <!-- Submit Button -->
      <BaseButton 
        type="submit" 
        class="w-full mt-[8px]"
      >
        Ver meu diagnóstico
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="20" height="20">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </BaseButton>
    </form>

    <p class="text-[11.5px] text-brand-muted2 text-center mt-[16px] leading-normal">
      🔒 Seus dados estão seguros e não serão compartilhados. Usamos apenas para enviar seu diagnóstico.
    </p>
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

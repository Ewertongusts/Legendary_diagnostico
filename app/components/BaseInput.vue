<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  placeholder?: string
  type?: string
  error?: string | boolean
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  autocomplete?: string
}>(), {
  type: 'text',
  error: false
})

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  (e: 'input', event: Event): void
}>()

const hasError = computed(() => !!props.error)
const errorMessage = computed(() => typeof props.error === 'string' ? props.error : '')
</script>

<template>
  <div>
    <label 
      v-if="label" 
      class="block text-[12.5px] font-semibold text-brand-muted mb-[7px] tracking-[0.3px]"
    >
      {{ label }}
    </label>
    
    <input 
      v-model="model"
      :type="type" 
      :placeholder="placeholder" 
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      @input="emit('input', $event)"
      class="w-full bg-brand-bg border rounded-xl p-[14px] px-[15px] text-brand-text text-[15px] font-inter transition-all placeholder-brand-muted2 focus:outline-none focus:border-brand-blue focus:bg-[#0b1322] focus:ring-4 focus:ring-brand-blue/12"
      :class="hasError ? 'border-brand-red' : 'border-brand-border'"
    />
    
    <span 
      v-if="hasError && errorMessage" 
      class="text-[11.5px] text-brand-red mt-1 block font-medium animate-fadeIn"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-3px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

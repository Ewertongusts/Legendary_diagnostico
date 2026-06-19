<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  options?: string[]
  placeholder?: string
}>(), {
  placeholder: 'Selecione…',
  options: () => []
})

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div>
    <label 
      v-if="label" 
      class="block text-[12.5px] font-semibold text-brand-muted mb-[7px] tracking-[0.3px]"
    >
      {{ label }}
    </label>
    
    <select 
      v-model="model"
      class="w-full bg-brand-bg border border-brand-border rounded-xl p-[14px] px-[15px] text-brand-text text-[15px] font-inter transition-all focus:outline-none focus:border-brand-blue focus:bg-[#0b1322]"
    >
      <option value="">{{ placeholder }}</option>
      <option 
        v-for="opt in options" 
        :key="opt" 
        :value="opt"
      >
        {{ opt }}
      </option>
    </select>
  </div>
</template>

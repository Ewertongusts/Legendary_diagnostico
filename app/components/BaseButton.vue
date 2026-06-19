<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'success' | 'outline' | 'text'
  size?: 'md' | 'lg'
  type?: 'button' | 'submit'
  disabled?: boolean
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
}>(), {
  variant: 'primary',
  size: 'lg',
  type: 'button',
  disabled: false,
  as: 'button'
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'text-white bg-gradient-to-br from-[#1FB855] to-[#25D366] shadow-[0_12px_28px_-8px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(37,211,102,0.7)] border border-transparent'
    case 'outline':
      return 'text-brand-blue-soft bg-transparent border-[1.5px] border-brand-border2 hover:border-brand-blue hover:bg-brand-blue/6'
    case 'text':
      return 'bg-none border-none text-brand-muted text-sm disabled:opacity-30 disabled:cursor-default hover:text-brand-text'
    case 'primary':
    default:
      return 'text-white bg-gradient-to-br from-[#3B6EF6] to-[#5E8BFF] shadow-[0_12px_28px_-8px_rgba(59,110,246,0.6)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(59,110,246,0.75)] border border-transparent'
  }
})

const sizeClasses = computed(() => {
  if (props.variant === 'text') return ''
  return props.size === 'lg' ? 'px-[30px] py-[16px]' : 'px-6 py-3.5'
})

const baseClasses = computed(() => {
  if (props.variant === 'text') {
    return 'cursor-pointer font-inter font-medium inline-flex items-center gap-[6px] p-[8px] transition-colors'
  }
  return 'inline-flex items-center justify-center gap-[10px] font-inter font-semibold text-[15.5px] rounded-[13px] cursor-pointer transition-all duration-180 focus-visible:outline focus-visible:outline-3 focus-visible:outline-brand-blue-soft focus-visible:outline-offset-3 select-none text-decoration-none'
})
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :href="href"
    :target="target"
    :rel="rel"
    :disabled="disabled || undefined"
    :class="[baseClasses, variantClasses, sizeClasses, { 'opacity-50 pointer-events-none': disabled }]"
  >
    <slot />
  </component>
</template>

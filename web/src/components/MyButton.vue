<script setup lang="ts">
import { computed } from 'vue';

type ButtonSizes = 'sm' | 'md' | 'lg';
type ButtonVariants = 'solid' | 'outline';

interface ButtonProps {
  asLink?: boolean;
  to?: string;
  size?: ButtonSizes;
  variant?: ButtonVariants;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  asLink: false,
  to: '/',
  size: 'lg',
  variant: 'solid',
});

const buttonSizeMap: Record<ButtonSizes, string> = {
  lg: 'py-4 px-6',
  md: 'py-3 px-5',
  sm: 'py-2 px-4',
};

const buttonVariantsMap: Record<ButtonVariants, string> = {
  solid: 'bg-violet-500 hover:bg-violet-600',
  outline:
    'bg-violet-500/10 hover:bg-violet-500/30 outline outline-1 outline-violet-500',
};

const buttonSizeClasses = computed(() => buttonSizeMap[props.size]);
const buttonVariantClasses = computed(() => buttonVariantsMap[props.variant]);
</script>

<template>
  <router-link
    v-if="asLink"
    class="button link"
    :class="[buttonSizeClasses]"
    :to="to"
    active-class="active"
  >
    <slot></slot>
  </router-link>

  <button
    v-else
    class="button"
    :class="[buttonSizeClasses, buttonVariantClasses]"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  @apply block cursor-pointer rounded text-white text-sm font-bold drop-shadow-purple active:translate-y-1 transition;
}

.button.link {
  @apply bg-transparent hover:bg-white/10;
}
.button.active {
  @apply bg-white/20;
}
</style>

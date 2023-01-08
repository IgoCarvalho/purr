<script setup lang="ts">
import { computed } from 'vue';

type ButtonSizes = 'sm' | 'md' | 'lg';
type ButtonVariants = 'solid' | 'outline' | 'link';

interface ButtonProps {
  asLink?: boolean;
  to?: string;
  size?: ButtonSizes;
  variant?: ButtonVariants;
  rounded?: boolean;
  icon?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  asLink: false,
  to: '/',
  size: 'lg',
  variant: 'solid',
  rounded: false,
  icon: false,
});

const buttonSizeMap: Record<ButtonSizes, string> = {
  lg: 'py-4 px-6 font-bold',
  md: 'py-3 px-5 font-semibold',
  sm: 'py-2 px-4 font-semibold',
};

const buttonVariantsMap: Record<ButtonVariants, string> = {
  solid: 'bg-purr-gradient  bg-size-200% hover:bg-right ',
  outline:
    ' hover:bg-purr-pink hover:text-white outline outline-1 outline-purr-pink',
  link: 'hover:text-purr-pink px-1',
};

const buttonIconMap: Record<ButtonSizes, string> = {
  lg: 'px-4',
  md: 'px-3',
  sm: 'px-2',
};

const buttonSizeClasses = computed(() => buttonSizeMap[props.size]);
const buttonVariantClasses = computed(() => buttonVariantsMap[props.variant]);
const buttonRoundedClasses = computed(() =>
  props.rounded ? 'rounded-full' : 'rounded'
);
const buttonIconClasses = computed(() => buttonIconMap[props.size]);
</script>

<template>
  <router-link
    v-if="asLink"
    class="button-base"
    :class="[
      buttonSizeClasses,
      buttonVariantClasses,
      buttonRoundedClasses,
      { [buttonIconClasses]: icon },
    ]"
    :to="to"
  >
    <slot></slot>
  </router-link>

  <button
    v-else
    class="button-base"
    :class="[
      buttonSizeClasses,
      buttonVariantClasses,
      buttonRoundedClasses,
      { [buttonIconClasses]: icon },
    ]"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button-base {
  @apply cursor-pointer text-sm text-white bg-transparent flex justify-center items-center gap-3 uppercase hover:drop-shadow-purple active:translate-y-1 transition-all duration-300;
}
</style>

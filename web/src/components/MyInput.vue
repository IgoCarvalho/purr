<script setup lang="ts">
import type { Component } from 'vue';

interface InputProps {
  modelValue: string;
  type: string;
  placeholder?: string;
  name: string;
  label?: string;
  leftIcon?: Component;
  rightIcon?: Component;
}
defineProps<InputProps>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

function updateValeu(e: Event) {
  const el = e.target as HTMLInputElement;
  emit('update:modelValue', el.value);
}
</script>

<template>
  <div>
    <label v-if="label" :for="name">{{ label }}</label>
    <div
      :class="`
        flex gap-2 w-full px-3 py-2 rounded
      bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-400 focus-within:text-purr-pink
        focus-within:outline-1 focus-within:outline focus-within:outline-purr-pink focus-within:-outline-offset-1
        focus-within:ring-2 focus-within:ring-purr-pink/30
      `"
    >
      <component class="min-w-[24px] h-6" :is="leftIcon" v-if="leftIcon" />
      <input
        :id="name"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        class="bg-transparent outline-none flex-1 text-gray-100"
        @input="updateValeu"
      />
      <component class="min-w-[24px] h-6" :is="rightIcon" v-if="rightIcon" />
    </div>
  </div>
</template>

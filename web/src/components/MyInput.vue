<script setup lang="ts">
interface InputProps {
  modelValue: string;
  type: string;
  placeholder?: string;
  name: string;
  label?: string;
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
    <input
      :id="name"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      class="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md block w-full hover:border-gray-600 focus:border-purr-pink focus:outline-purr-pink/30 focus:outline"
      @input="updateValeu"
    />
  </div>
</template>

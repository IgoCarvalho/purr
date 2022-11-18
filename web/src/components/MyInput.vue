<script setup lang="ts">
interface InputProps {
  value: string;
  type: string;
  placeholder?: string;
  name: string;
  label?: string;
}
defineProps<InputProps>();

const emit = defineEmits<{
  (event: 'input', value: string): void;
}>();

function updateValeu(e: Event) {
  const el = e.target as HTMLInputElement;
  emit('input', el.value);
}
</script>

<template>
  <div>
    <label v-if="label" :for="name">{{ label }}</label>
    <input
      :id="name"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="bg-gray-900 border border-gray-800 px-3 py-2 rounded-md block w-full hover:border-gray-700 focus:border-purr-pink focus:outline-purr-pink/30 focus:outline"
      @input="updateValeu"
    />
  </div>
</template>

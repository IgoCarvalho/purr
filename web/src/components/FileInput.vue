<script setup lang="ts">
import { computed } from 'vue';

interface FileInputEmits {
  (event: 'file', data: string, file: File): void;
}

const emit = defineEmits<FileInputEmits>();

interface FileInputProps {
  name: string;
  multiple?: boolean;
  accept?: string;
  max?: number;
}

const props = defineProps<FileInputProps>();

function handleFileChanges(e: Event) {
  const input = e.target as HTMLInputElement;

  if (input.files) {
    Array.from(input.files).forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = function (ev) {
        ev.target?.result && emit('file', ev.target?.result.toString(), file);
      };
    });
  }

  input.files = null;
  input.value = '';
}

const isDisabled = computed(() => {
  if (typeof props.max === 'number') {
    return props.max < 1;
  }

  return false;
});
</script>

<template>
  <label
    class="cursor-pointer text-sm text-white bg-transparent flex justify-center items-center gap-3 hover:drop-shadow-purple bg-gray-800 hover:bg-gray-700 border border-gray-700 py-2 px-4 font-semibold rounded"
    :class="{
      'cursor-not-allowed opacity-70 hover:drop-shadow-none hover:bg-gray-800':
        isDisabled,
    }"
    :for="`${name}-file`"
  >
    Adicionar Arquivo
  </label>
  <input
    class="hidden"
    :id="`${name}-file`"
    :name="name"
    type="file"
    :multiple="multiple"
    :accept="accept"
    @change="handleFileChanges"
    :disabled="isDisabled"
  />
</template>

<style scoped></style>

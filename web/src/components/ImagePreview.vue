<script setup lang="ts">
import TrashIcon from './icons/TrashIcon.vue';

export interface ImagePreviewProps {
  fileData: string;
  file: File;
}
defineProps<ImagePreviewProps>();

interface ImagePreviewEmits {
  (event: 'remove'): void;
}
const emit = defineEmits<ImagePreviewEmits>();

function handleRemove() {
  emit('remove');
}
</script>

<template>
  <div class="w-44 p-2 bg-gray-800 rounded flex flex-col gap-2 relative">
    <div
      class="absolute top-1 right-1 border border-gray-500/50 hover:border-gray-500 bg-gray-700 hover:bg-gray-700/70 hover:text-red-400 p-1 rounded cursor-pointer"
      @click="handleRemove"
    >
      <TrashIcon class="h-5 w-5 transition-colors" />
    </div>

    <img class="w-full h-40 object-cover" :src="fileData" :alt="file.name" />
    <p class="text-xs truncate">
      {{ file.name }}
    </p>
  </div>
</template>

<style scoped>
a {
  color: currentColor;
}
</style>

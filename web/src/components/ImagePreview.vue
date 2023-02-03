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
  <div
    class="w-full max-w-sm p-2 bg-gray-800 rounded flex flsex-col items-center gap-2 relative"
  >
    <p class="text-xs truncate flex-1">
      {{ file.name }}
    </p>
    <img
      class="w-full max-w-[40px] h-8 object-cover"
      :src="fileData"
      :alt="file.name"
    />
    <div
      class="flex items-center border border-gray-500/50 hover:border-gray-500 bg-gray-700 hover:bg-gray-700/70 hover:text-red-400 p-1 rounded cursor-pointer"
      @click="handleRemove"
    >
      <TrashIcon class="h-5 w-5 transition-colors" />
    </div>
  </div>
</template>

<style scoped>
a {
  color: currentColor;
}
</style>

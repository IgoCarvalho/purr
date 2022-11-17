<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import { usePostsStore } from '@/stores/posts';

const containerRef = ref<HTMLElement | null>(null);
const postsStore = usePostsStore();

interface EmitsType {
  (event: 'load'): void;
}
const emit = defineEmits<EmitsType>();

function handleScroll() {
  if (!postsStore.haveMorePosts || postsStore.isLoading) return;

  if (containerRef.value) {
    const { clientHeight: viewportHeight } = document.documentElement;
    const containerEndPosition =
      containerRef.value?.getBoundingClientRect().bottom;
    const viewportOffset = 400;

    if (viewportHeight + viewportOffset - containerEndPosition > 0) {
      emit('load');
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div ref="containerRef" class="flex flex-col gap-5">
    <slot />
  </div>
</template>

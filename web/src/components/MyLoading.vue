<script setup lang="ts">
import CachedIcon from './icons/CachedIcon.vue';
</script>

<template>
  <div
    class="px-4 py-3 w-fit flex mx-auto gap-2 rounded bg-purr-pink/80 border border-purr-pink"
  >
    <CachedIcon class="animate-spin" />
    <p>Carregando...</p>
  </div>
</template>

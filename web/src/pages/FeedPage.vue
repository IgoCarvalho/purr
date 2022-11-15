<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
</script>

<template>
  <div class="max-w-3xl mx-auto py-5">
    <div class="pb-5 border-b border-b-gray-800">
      <h1 class="text-2xl">Postagens recentes</h1>
    </div>

    <div class="max-w-lg mx-auto pt-10 flex flex-col gap-5">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  </div>
</template>

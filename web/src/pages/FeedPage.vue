<script setup lang="ts">
import { ref } from 'vue';

import PostCard from '@/components/PostCard.vue';
import axios from '@/lib/axios';
import type { Post } from '@/interfaces/post';

const posts = ref<Post[] | null>(null);

async function getPosts() {
  try {
    const response = await axios.get<Post[]>('posts/public');

    console.log(response.data);

    posts.value = response.data;
  } catch (err) {
    console.log(err);
  }
}
getPosts();
</script>

<template>
  <div class="max-w-3xl mx-auto py-5">
    <div class="pb-5 border-b border-b-gray-800">
      <h1 class="text-2xl">Postagens recentes</h1>
    </div>

    <div v-if="posts" class="max-w-lg mx-auto pt-10 flex flex-col gap-5">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

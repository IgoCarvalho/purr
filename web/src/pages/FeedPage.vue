<script setup lang="ts">
import { computed } from 'vue';
import PostCard from '@/components/PostCard.vue';
import FeedContainer from '@/components/FeedContainer.vue';
import MyLoading from '@/components/MyLoading.vue';

import { usePostsStore } from '@/stores/posts';
import type { Post } from '@/interfaces/post';

const postsStore = usePostsStore();
const gridColumns = 4;

postsStore.getPosts();

function loadMorePosts() {
  postsStore.getPosts();
}

const postsColumns = computed(() => {
  const posts = postsStore.posts;

  let columnIndex = 0;

  const postsColumnsContainer: Post[][] = new Array(gridColumns)
    .fill(null)
    .map(() => []);

  posts.forEach((post) => {
    if (columnIndex >= gridColumns) {
      columnIndex = 0;
    }
    postsColumnsContainer[columnIndex].push(post);

    columnIndex++;
  });

  return postsColumnsContainer;
});
</script>

<template>
  <div class="max-w-7xl mx-auto py-5 pb-20">
    <div class="pb-5 px-3 border-b border-b-gray-800">
      <h1 class="text-2xl">Postagens recentes</h1>
    </div>

    <div class="max-w-7xl mx-auto pt-10">
      <template v-if="postsStore.posts.length">
        <FeedContainer @load="loadMorePosts">
          <div class="grid grid-cols-posts">
            <div
              class="flex flex-col"
              v-for="(col, colIndex) in postsColumns"
              :key="colIndex"
            >
              <PostCard v-for="post in col" :key="post.id" :post="post" />
            </div>
          </div>
        </FeedContainer>
      </template>

      <template v-else-if="!postsStore.isLoading">
        <p class="text-center text-lg">Nenhum post foi encontrado 😭</p>
      </template>

      <MyLoading class="mt-4" v-if="postsStore.isLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import FeedContainer from '@/components/FeedContainer.vue';
import MyLoading from '@/components/MyLoading.vue';

import { usePostsStore } from '@/stores/posts';

const postsStore = usePostsStore();

postsStore.getPosts();

function loadMorePosts() {
  postsStore.getPosts();
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-5 pb-20">
    <div class="pb-5 px-3 border-b border-b-gray-800">
      <h1 class="text-2xl">Postagens recentes</h1>
    </div>

    <div class="max-w-7xl mx-auto pt-10">
      <template v-if="postsStore.posts.length">
        <FeedContainer @load="loadMorePosts">
          <div class="columns-3 gap-4 space-y-4">
            <PostCard
              v-for="post in postsStore.posts"
              :key="post.id"
              :post="post"
            />
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

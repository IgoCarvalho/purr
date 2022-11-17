import { defineStore } from 'pinia';
import { ref } from 'vue';

import axios from '@/lib/axios';
import type { Post } from '@/interfaces/post';

export const usePostsStore = defineStore('posts', () => {
  const isLoading = ref(true);
  const haveMorePosts = ref(true);
  const postsPage = ref(0);
  const postsPerPage = 10;
  const posts = ref<Post[]>([]);

  async function getPosts() {
    try {
      isLoading.value = true;

      const response = await axios.get<Post[]>(
        `posts/public?page=${postsPage.value}`
      );

      if (response.data.length < postsPerPage) {
        haveMorePosts.value = false;
      }

      postsPage.value += 1;

      posts.value = [...posts.value, ...response.data];
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    posts,
    getPosts,
    haveMorePosts,
  };
});

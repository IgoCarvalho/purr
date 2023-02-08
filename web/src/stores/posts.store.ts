import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Post } from '@/interfaces/post';

import * as postsService from '@/services/posts.service';

export const usePostsStore = defineStore('posts', () => {
  const isLoading = ref(false);
  const haveMorePosts = ref(true);
  const postsPage = ref(0);
  const postsPerPage = 10;
  const posts = ref<Post[]>([]);

  async function getPosts() {
    try {
      isLoading.value = true;

      const postsResponse = await postsService.list(postsPage.value);

      if (postsResponse.length < postsPerPage) {
        haveMorePosts.value = false;
      }

      postsPage.value += 1;

      posts.value = [...posts.value, ...postsResponse];
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function create(postData: FormData) {
    try {
      isLoading.value = true;

      const createdPost = await postsService.create(postData);

      console.log({ createdPost });

      posts.value.unshift(createdPost);
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    posts,
    haveMorePosts,
    getPosts,
    create,
  };
});

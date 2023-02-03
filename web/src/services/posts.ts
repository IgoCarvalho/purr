import type { Post, PostResponse } from '@/interfaces/post';
import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { getBearerToke } from './auth';

function withOwnerData(post: PostResponse) {
  const authStore = useAuthStore();

  if (authStore.user) {
    return {
      ...post,
      ownerId: authStore.user.id,
      owner: authStore.user,
    };
  }

  return post as Post;
}

export async function list(page: number) {
  const response = await axios.get<Post[]>(`posts/public?page=${page}`);

  return response.data;
}

export async function create(postData: FormData) {
  const response = await axios.post<PostResponse>('posts', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: getBearerToke(),
    },
  });

  return withOwnerData(response.data);
}

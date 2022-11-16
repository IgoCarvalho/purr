<script setup lang="ts">
import type { Post } from '@/interfaces/post';
import { computed } from 'vue';
import MyButton from './MyButton.vue';

const props = defineProps<{
  post: Post;
}>();

const formattedDate = computed(() => {
  const date = new Date(props.post.createdAt) || new Date();

  return date.toLocaleDateString('pt-BR');
});
</script>

<template>
  <div class="bg-gray-900 rounded border border-gray-800">
    <div class="flex items-center gap-3 p-2">
      <img
        class="w-10 rounded-full border border-gray-800"
        :src="post.owner.avatarUrl || 'https://github.com/diego3g.png'"
        alt="User Image"
      />
      <div>
        <p class="text-white text-lg font-bold">{{ post.owner.name }}</p>
        <span class="text-gray-400 text-sm">{{ formattedDate }}</span>
      </div>
    </div>

    <div class="px-3">
      <p>
        {{ post.text }}
      </p>
    </div>

    <div class="my-2 w-full bg-purr-900">
      <img
        class="object-contain w-full h-full max-h-[450px]"
        :src="
          post.images[0]
            ? post.images[0].url
            : 'https://i.pinimg.com/originals/fa/d2/3e/fad23e6dada5100e22edbb3d755209ca.png'
        "
        alt=""
      />
    </div>

    <div class="p-2 flex gap-3">
      <MyButton size="sm" variant="outline">Curtir</MyButton>
      <MyButton size="sm" variant="outline">Comentários</MyButton>
    </div>
  </div>
</template>

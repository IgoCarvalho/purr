<script setup lang="ts">
import { computed } from 'vue';

import type { Post } from '@/interfaces/post';
import MyButton from './MyButton.vue';

import HeartIcon from './icons/HeartIcon.vue';
import MessageIcon from './icons/MessageIcon.vue';

import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperModules = [Pagination, Navigation];

const props = defineProps<{
  post: Post;
}>();

const formattedDate = computed(() => {
  const date = new Date(props.post.createdAt) || new Date();

  return date.toLocaleDateString('pt-BR');
});
</script>

<template>
  <div class="relative bg-gray-900 sm:rounded border border-gray-800">
    <div class="w-full bg-purr-dark post-images">
      <Swiper
        :modules="swiperModules"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
      >
        <SwiperSlide v-for="image in post.images" :key="image.id">
          <img
            class="object-contain w-full h-full max-h-[450px]"
            :src="
              image
                ? image.url
                : 'https://i.pinimg.com/originals/fa/d2/3e/fad23e6dada5100e22edbb3d755209ca.png'
            "
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <div
      class="absolute inset-0 z-10 flex items-end cursor-pointer p-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
    >
      <div class="w-full bg-gray-800 rounded-md">
        <div class="flex items-center gap-3 p-2">
          <img
            class="w-10 rounded-full border border-gray-800"
            :src="post.owner.avatarUrl || 'https://github.com/igocarvalho.png'"
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

        <div class="p-2 flex gap-3">
          <MyButton size="sm" rounded variant="outline">
            <HeartIcon />
            Curtir
          </MyButton>
          <MyButton size="sm" rounded variant="outline">
            <MessageIcon />
            Comentários
          </MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.post-images .swiper-button-next,
.post-images .swiper-button-prev {
  @apply text-purr-pink h-full top-0 mt-0 w-11 after:text-3xl;
}
.post-images .swiper-button-next {
  @apply right-0 bg-gradient-to-l from-black/70 to-transparent after:content-['next'];
}
.post-images .swiper-button-prev {
  @apply left-0 bg-gradient-to-r from-black/70 to-transparent after:content-['prev'];
}

.post-images .swiper-pagination {
  @apply flex items-center bg-black/40 p-2 left-1/2 -translate-x-1/2 w-auto rounded-full;
}
.post-images .swiper-pagination .swiper-pagination-bullet {
  @apply bg-white opacity-50;
}
.post-images .swiper-pagination .swiper-pagination-bullet-active {
  @apply bg-purr-pink opacity-100;
}
</style>

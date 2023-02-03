<script setup lang="ts">
import { ref } from 'vue';
import UserFillIcon from './icons/UserFillIcon.vue';

interface UserImageProps {
  src?: string;
  alt?: string;
}
defineProps<UserImageProps>();

const hasImage = ref(false);

function handleImageError() {
  window.alert('cagou');
}
</script>

<template>
  <img v-if="hasImage" :src="src" :alt="alt" @error="handleImageError" />
  <UserFillIcon v-else />
</template>

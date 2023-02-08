<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { usePostsStore } from '@/stores/posts.store';

import FileInput from '@/components/FileInput.vue';
import ImagePreview from '@/components/ImagePreview.vue';
import MyButton from '@/components/MyButton.vue';

interface PostImage {
  fileData: string;
  file: File;
}

const postsStore = usePostsStore();
const router = useRouter();

const maxFiles = 5;
const postText = ref('');
const postImages = ref<PostImage[]>([]);
const isLoading = ref(false);

function handleImage(fileData: string, file: File) {
  postImages.value.push({ fileData, file });
  console.log({ images: postImages.value.length });
}

function handleRemoveImagePreview(index: number) {
  postImages.value.splice(index, 1);
}

async function handleSubmit() {
  console.log({ text: postText.value, images: postImages.value });

  if (postImages.value.length === 0) {
    window.alert('Adicione pelo menos uma imagem');
    return;
  }

  const form = new FormData();

  form.append('text', postText.value);

  Array.from(postImages.value).forEach(({ file }) => {
    form.append('files', file);
  });

  isLoading.value = true;

  try {
    await postsStore.create(form);

    router.push('/');
  } catch (error) {
    console.log(error);
    window.alert('Aconteceu algo de errado, tente novamente mais tarde!');
  } finally {
    isLoading.value = false;
  }
}

const remainingImages = computed(() => {
  return maxFiles - postImages.value.length;
});
</script>

<template>
  <main class="max-w-5xl mx-auto h-full px-5 py-10 pb-20">
    <h1 class="text-3xl font-bold mb-10">
      Poste algo para que os outros vejam
    </h1>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col md:flex-row flex-wrap gap-3"
      enctype="multipart/form-data"
    >
      <div class="flex-1 flex flex-col">
        <p class="font-semibold mb-2">
          Imagens
          <span class="bg-gray-800 py-1 px-2 rounded-full text-sm"
            >{{ postImages.length }} / {{ maxFiles }}</span
          >
        </p>
        <div
          class="w-full grid grid-cols-image-preview justify-items-center content-start gap-2"
          v-show="postImages.length > 0"
        >
          <ImagePreview
            v-for="(image, index) in postImages"
            :key="image.fileData.substring(0, 100)"
            :file="image.file"
            :file-data="image.fileData"
            @remove="handleRemoveImagePreview(index)"
          />
        </div>

        <div class="self-center my-8 sm:my-auto">
          <FileInput
            name="images"
            accept="image/png, image/jpeg"
            multiple
            :max="remainingImages"
            @file="handleImage"
          />
        </div>
      </div>

      <div class="flex-1">
        <p class="font-semibold mb-2">Oque você está pensando?</p>
        <textarea
          class="w-full block h-60 flex-1 p-2 bg-gray-900 border border-gray-800 rounded hover:border-gray-700 outline-none focus:ring-1 focus:ring-gray-600"
          name="text"
          placeholder="Olhem meu gatinho"
          v-model="postText"
        ></textarea>
      </div>

      <div class="w-full flex sm:justify-end py-4">
        <MyButton
          :loading="isLoading"
          type="submit"
          size="md"
          class="w-full sm:w-auto"
        >
          Postar
        </MyButton>
      </div>
    </form>
  </main>
</template>

<style scoped></style>

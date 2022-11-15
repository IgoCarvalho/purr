<script setup lang="ts">
import MyButton from './MyButton.vue';
</script>

<template>
  <div class="bg-gray-900 rounded border border-gray-800">
    <div class="flex items-center gap-3 p-2">
      <img
        class="w-10 rounded-full border border-gray-800"
        src="https://github.com/diego3g.png"
        alt="User Image"
      />
      <div>
        <p class="text-white text-lg font-bold">Igo Carvalho</p>
        <span class="text-gray-400 text-sm">19:23</span>
      </div>
    </div>

    <div class="px-3">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est molestiae
        natus esse?
      </p>
    </div>

    <div class="my-2 w-full bg-purr-900">
      <img
        class="object-contain w-full h-full max-h-[450px]"
        src="https://i.pinimg.com/originals/fa/d2/3e/fad23e6dada5100e22edbb3d755209ca.png"
        alt=""
      />
    </div>

    <div class="p-2 flex gap-3">
      <MyButton size="sm" variant="outline">Curtir</MyButton>
      <MyButton size="sm" variant="outline">Comentários</MyButton>
    </div>
  </div>
</template>

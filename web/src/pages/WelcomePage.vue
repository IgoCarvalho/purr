<script setup lang="ts">
import MyBadge from '@/components/MyBadge.vue';
import Button from '@/components/MyButton.vue';

import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue';
</script>

<template>
  <main
    class="min-h-screen container mx-auto py-4 px-6 grid sm:grid-cols-2 items-center gap-5 overflow-auto"
  >
    <div>
      <MyBadge>
        <template #title>Cuidado</template>
        O site pode conter fotos suspeitas! 🤔
      </MyBadge>

      <h1 class="text-4xl leading-tight sm:text-5xl text-white font-bold mt-5">
        Uma rede social feita <br />
        para gatinhos! 😳
      </h1>

      <p class="mt-5 text-gray-400">
        Aproveite para postar e acompanhar as mais <br />
        diversas fotos e memes do mundo felino!
      </p>

      <div
        class="my-10 mt-20 flex flex-wrap justify-center gap-5 sm:justify-start"
      >
        <Button> Entre e aproveite! </Button>
        <Button as-link variant="link" to="/posts">
          Veja oque já está acontecendo
          <ArrowRightIcon />
        </Button>
      </div>
    </div>

    <div
      class="relative p-2 overflow-visible before:block before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-1/4 before:h-1/4 before:rounded-full before:-z-10 before:bg-[#6930c380] before:scale-150 before:blur-xl"
    >
      <img
        class="drop-shadow-purple"
        src="@/assets/images/sus-cats.png"
        alt="Três gato com olhar de suspeita"
      />
    </div>
  </main>
</template>

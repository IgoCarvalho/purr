<script setup lang="ts">
import IconPurr from '@/components/icons/IconPurr.vue';
import Button from '@/components/MyButton.vue';
</script>

<template>
  <main
    class="h-screen container mx-auto py-8 px-6 grid sm:grid-cols-2 items-center gap-5 overflow-auto"
  >
    <div>
      <IconPurr class="text-yellow-200" :size="150" aria-label="Purr Icon" />

      <h1 class="text-4xl leading-tight sm:text-5xl text-white font-bold mt-8">
        Uma rede social feita para gatinhos! 😳
      </h1>

      <p
        class="bg-neutral-700 break-words inline-block border-neutral-500 border px-2 py-1 rounded-full text-white text-sm mt-5"
      >
        Cuidado o site pode conter fotos suspeitas! 🤔
      </p>

      <div class="mt-10 flex justify-center sm:justify-start">
        <Button> Entre e aproveite! </Button>
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

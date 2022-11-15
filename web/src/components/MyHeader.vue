<script setup lang="ts">
import IconPurr from './icons/IconPurr.vue';
import Button from './MyButton.vue';
import NavLinks from './NavLinks.vue';
</script>

<template>
  <header
    class="px-6 py-3 h-16 flex items-center text-white fixed top-0 left-0 w-full backdrop-blur bg-violet-900/10 z-10"
  >
    <div class="container mx-auto grid grid-cols-[1fr_auto_1fr]">
      <IconPurr class="text-yellow-300" />

      <NavLinks />

      <div class="flex justify-end">
        <Button size="sm" variant="outline">Login / Entrar</Button>
      </div>
    </div>
  </header>
</template>

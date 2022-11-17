<script setup lang="ts">
import IconPurr from './icons/IconPurr.vue';
import Button from './MyButton.vue';
import NavLinks from './NavLinks.vue';
</script>

<template>
  <header
    class="px-6 py-3 h-16 flex items-center text-white sm:sticky top-0 w-full border-b border-gray-900 bg-purr-dark/70 backdrop-blur z-10"
  >
    <div
      class="container mx-auto flex justify-between items-center sm:grid grid-cols-[1fr_auto_1fr]"
    >
      <IconPurr class="text-yellow-300" />

      <div class="hidden sm:block">
        <NavLinks />
      </div>

      <div class="flex justify-end">
        <Button size="sm" variant="outline">Login / Entrar</Button>
      </div>
    </div>
  </header>
</template>

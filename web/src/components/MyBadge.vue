<script setup lang="ts"></script>

<template>
  <div
    class="bg-purple-500/30 inline-flex items-center gap-2 break-words border-purple-500 border p-0.5 pr-2 rounded-full text-white text-sm mt-5"
  >
    <span
      class="inline-block font-semibold bg-purple-500 px-1.5 py-1 rounded-full"
    >
      <slot name="title" />
    </span>
    <span class="inline-block">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts"></script>

<template>
  <nav class="nav-links">
    <ul class="flex items-center gap-2">
      <router-link class="py-2 px-3 font-semibold" to="/">Home</router-link>
      <router-link class="py-2 px-3 font-semibold" to="/posts">
        Posts
      </router-link>
    </ul>
  </nav>
</template>

<style>
.nav-links .router-link-active {
  @apply text-purr-pink;
}
</style>

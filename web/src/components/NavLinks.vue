<script setup lang="ts"></script>

<template>
  <nav class="nav-links">
    <ul class="flex items-center gap-2">
      <li>
        <router-link
          class="py-2 px-3 font-semibold hover:text-purr-pink"
          to="/"
        >
          Home
        </router-link>
      </li>
      <li>
        <router-link
          class="py-2 px-3 font-semibold hover:text-purr-pink"
          to="/posts"
        >
          Posts
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style>
.nav-links .router-link-active {
  @apply text-purr-pink;
}
</style>

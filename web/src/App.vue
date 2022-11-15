<script setup lang="ts">
import Header from './components/MyHeader.vue';
</script>

<template>
  <Header />
  <div class="py-16">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

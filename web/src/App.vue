<script setup lang="ts">
import FloatingNav from './components/FloatingNav.vue';
import Header from './components/MyHeader.vue';
</script>

<template>
  <Header />
  <router-view></router-view>
  <FloatingNav />
</template>

<style scoped></style>

<script setup lang="ts">
import Button from './MyButton.vue';
</script>

<template>
  <nav class="">
    <ul class="flex items-center gap-2">
      <Button asLink size="sm" to="/"> Home </Button>
      <Button asLink size="sm" to="posts"> Posts </Button>
    </ul>
  </nav>
</template>

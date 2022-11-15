<script setup lang="ts">
import Button from './MyButton.vue';
</script>

<template>
  <nav class="">
    <ul class="flex items-center gap-2">
      <Button asLink size="sm" to="acojad"> Home </Button>
      <Button asLink size="sm" to="acojad"> Posts </Button>
    </ul>
  </nav>
</template>

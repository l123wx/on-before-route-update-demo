<template>
  <div>
    <h1>Index Page</h1>
    <button @click="$router.push('/about')">To About Page</button>
  </div>
</template>


<script setup lang="ts">
import { onActivated, onMounted } from 'vue';

defineOptions({
  name: 'Index'
})

onMounted(() => {
  console.log('[Index] onMounted')
})

onActivated(() => {
  console.log('[Index] onActivated')
})
</script>
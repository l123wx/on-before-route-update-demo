<template>
    <div>
        <h1>About Page</h1>
        <button @click="$router.push('/')">To Index Page</button>
    </div>
</template>


<script setup lang="ts">
import { onActivated, onMounted } from 'vue';

defineOptions({
  name: 'About'
})

onMounted(() => {
    console.log('[About] onMounted')
})

onActivated(() => {
    console.log('[About] onActivated')
})
</script>
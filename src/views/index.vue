<template>
  <div>
    <h1>Index Page</h1>
    <div style="display: flex; gap: 10px;">
      <button @click="$router.push(`/about?t=${Date.now()}&static=123`)">Go to About Page with different query</button>
      <button @click="$router.push(`/about?t=1&static=123`)">Go To /about?t=1&static=123</button>
      <button @click="$router.push(`/about?t=1&static=456`)">Go To /about?t=1&static=456</button>
    </div>
  </div>
</template>


<script setup lang="ts">
defineOptions({
  name: 'Index'
})
</script>
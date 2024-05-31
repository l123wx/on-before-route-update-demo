<template>
  <div>
    <h1>About Page</h1>
    <div style="display: flex; gap: 10px;">
      <button @click="$router.push('/')">Back to Index Page</button>
      <button @click="$router.push(`/about?t=${Date.now()}&static=123`)">Go to About Page with different query</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onRouteQueryChange } from '../utils/router';

defineOptions({
  name: 'About'
})

const route = useRoute()

console.log('About', route.query)

// const t = useRouteQuery('t')
// console.log(t)

// watchEffect(() => {
//   console.log(t.value)
// })

// watch(() => route.query, () => {
//   console.log('watch route.query:', route.query)
// })

// onBeforeRouteUpdate(updateGuard => {
//   console.log('onBeforeRouteUpdate', updateGuard.query)
// })

onRouteQueryChange(query => {
  console.log('onRouteRouteUpdate', query)
})

onRouteQueryChange(query => {
  console.log('onRouteRouteUpdate immediate', query)
}, {
  immediate: true
})

onRouteQueryChange(query => {
  console.log('onRouteRouteUpdate', query)
}, {
  dependencies: ['static']
})


</script>
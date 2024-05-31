<template>
  <div>
    <h1>About Page</h1>
    <div style="display: flex; gap: 10px; flex-direction: column;">
      <button @click="$router.push('/')">Back to Index Page</button>
      <button @click="$router.push(`/about?t=${Date.now()}&static=123`)">Change query</button>
      <button @click="$router.push(`/about?t=1&static=123`)">Go To /about?t=1&static=123</button>
      <button @click="$router.push(`/about?t=1&static=456`)">Go To /about?t=1&static=456</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { watch, onActivated } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onRouteQueryChange } from '../utils/router'

defineOptions({
  name: 'About'
})

const route = useRoute()

console.log('About Page Setup')

/**
 * 使用 watch 监听 route query 有一个缺点
 * 当进行 /about?t=123 => /index 这种路由跳转时，route query 也是变化了，所以也会回调
 * 如果在这里请求页面数据，会导致切出页面的时候也会发一个无用的请求，为了避免这个情况又要添加代码去做判断
 */
watch(() => route.query, () => {
  console.log('[Vue] Watch route.query')
})

/**
 * 使用 onActivated 每次进入页面都会触发，在当前页面直接修改 route query 的时候不会触发回调
 */
onActivated(() => {
  console.log('[Vue] onActivated')
})

/**
 * onBeforeRouteUpdate 在页面销毁或冻结的时候不会触发，所以不会出现上面 watch 的情况
 * 但是在 route path 重新切回被冻结的页面时，就算 route query 改变了，也不会触发回调
 */
onBeforeRouteUpdate(_updateGuard => {
  console.log('[Vue Router] onBeforeRouteUpdate')
})

/**
 * 为了解决上述痛点，封装了一个方法，有如下特性：
 *  - 当 route query 改变时，会触发回调
 *  - 在页面进入冻结状态时，不会触发回调
 *  - 当页面重新进入活跃状态时，如果 route query 没有改变，不会触发回调
 *  - 当页面第一次挂载时，可以通过设置 immediate: true，立刻执行回回调。适用于页面初始化执行逻辑
 *  - 可以通过设置 dependencies 设置要监听的 route query，设置之后只有指定的 route query 变化才会回调
 */
onRouteQueryChange(_query => {
  console.log('[Custom] onRouteRouteUpdate')
})

onRouteQueryChange(_query => {
  console.log('[Custom] onRouteRouteUpdate immediate')
}, {
  immediate: true
})

onRouteQueryChange(_query => {
  console.log('[Custom] onRouteRouteUpdate depend query static')
}, {
  dependencies: ['static']
})
</script>
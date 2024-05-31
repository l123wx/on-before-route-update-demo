<template>
  Press F12 Open Console
  <router-view v-slot="{ Component, route }">
    <h3>Page About is a keep-alive Page</h3>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cacheList">
        <component v-if="!route.meta.link" :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, KeepAlive } from 'vue';

const cacheList = ref<string[]>(['About'])
</script>

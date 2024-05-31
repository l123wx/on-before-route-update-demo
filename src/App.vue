<template>
  Press F12 Open Console
  <router-view v-slot="{ Component, route }">
    <h3>cacheList: {{ cacheList }}</h3>
    <div style="display: flex; column-gap: 20px">
      <button v-if="cacheList.includes('Index')" @click="cacheList = cacheList.filter(key => key !== 'Index')">
        Remove Index To Cache
      </button>
      <button v-else @click="cacheList = [...new Set([...cacheList, 'Index'])]">
        Add Index To Cache
      </button>
      <button v-if="cacheList.includes('About')" @click="cacheList = cacheList.filter(key => key !== 'About')">
        Remove About To Cache
      </button>
      <button v-else @click="cacheList = [...new Set([...cacheList, 'About'])]">
        Add About To Cache
      </button>
    </div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cacheList">
        <component v-if="!route.meta.link" :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, KeepAlive } from 'vue';

const cacheList = ref<string[]>([])
</script>

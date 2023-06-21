<script setup>
// import { onMounted, onUnmounted } from 'vue'
// const x = 7;
// function update(event) {
//   console.log('update', event.pageX, event.pageY)
// }
// onMounted(() => window.addEventListener('mousemove', update))
// onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>
  <header>
    <slot></slot>
  </header>
</template>

<style scoped>
  header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
  }
</style>
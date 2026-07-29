
<script setup>
const icon = typeof biApp !== 'undefined' ? biApp : ''
</script>


<template>
  <div>
    <QIcon v-if="icon" :name="icon" />
  </div>
</template>

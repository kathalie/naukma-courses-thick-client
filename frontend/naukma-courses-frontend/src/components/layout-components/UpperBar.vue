<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">{{ caption }}</span>
      <h1 class="navbar-brand mb-0 h1">NaUKMA Courses</h1>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps({
  caption: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.navbar-brand {
  margin-left: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>

<template>
  <div class="courses-details">
    <UpperBar caption="Деталі курсу"/>

    <Breadcrumbs/>
    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">Failed to load courses.</div>

    <div v-else class="content">
      <h2>{{ course.name }}</h2>
      <p>{{ course.facultyName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {getCourse} from "@/scripts/fetch.js";
import type {Course} from "@/models/course";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import UpperBar from "@/components/layout-components/UpperBar.vue";

const route = useRoute();

const loading = ref(false)
const course = ref({} as Course);
const error = ref(false)

watch(
    () => route.params.code,
    async code => fetchCourse(code as string),
    { immediate: true }
);

async function fetchCourse(code: string) {
  error.value = false;
  loading.value = true;
  loading.value = true;

  try {
    course.value = await getCourse(code)
  } catch (err) {
    console.log((err as Error).message);
    error.value = true;
  } finally {
    loading.value = false;
  }
}
</script>
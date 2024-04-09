<template>
  <div class="courses-details">
    <UpperBar caption="Деталі курсу"/>
    <Breadcrumbs/>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">Failed to load courses.</div>
    <div v-else class="content">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <tbody>
              <tr v-for="(field, index) in fields(course)" :key="index">
                <th scope="row" class="bg-dark text-light">{{ field.name }}</th>
                <td>{{ field.value }}</td>
              </tr>
              <tr>
                <th scope="row" class="bg-dark text-light">Курс</th>
                <td>{{ course.year }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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

const loading = ref(false);
const course = ref({} as Course);
const error = ref(false);

function fields(course: Course) {
  return[
    {name: "Код", value: course.code},
    {name: "Назва", value: course.name},
    {name: "Факультет", value: course.facultyName},
    {name: "Кафедра", value: course.departmentName},
    {name: "Опис", value: course.description},
    {name: "Викладач", value: course.teacherName},
    {name: "Години", value: course.hoursAmount},
    {name: "Кредити", value: course.creditsAmount},
    {name: "Рівень", value: course.level},
    {name: "Курс", value: course.year},
  ];
}

watch(
    () => route.params.code,
    async code => fetchCourse(code as string),
    { immediate: true }
);

setInterval(() => {
  fetchCourse(route.params.code as string);
}, 1000 * 60);

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
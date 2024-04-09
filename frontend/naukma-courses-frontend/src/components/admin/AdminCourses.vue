<template>
  <div class="col-md-9 ms-sm-auto col-lg-9 px-md-4">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <table class="table table-hover table-dark">
            <thead class="thead-dark">
            <tr>
              <th scope="col">Код</th>
              <th scope="col">Назва</th>
              <th scope="col">Факультет</th>
              <th scope="col">Кафедра</th>
              <th scope="col">Викладач</th>
              <th scope="col">Рік</th>
              <th scope="col">Рівень</th>
              <th scope="col">ECTS</th>
              <th scope="col">Години</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <template v-if="loading">
              <tr>
                <td colspan="5" class="loading">Завантаження...</td>
              </tr>
            </template>
            <template v-else-if="error">
              <tr>
                <td colspan="5" class="error">Не вдалося завантажити курси.</td>
              </tr>
            </template>
            <template v-else-if="courses.length === 0">
              <tr>
                <td colspan="5" class="no-data">Курси не знайдено.</td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="course in courses" :key="course.code">
                <td>{{ course.code }}</td>
                <td>{{ course.name }}</td>
                <td>{{ course.facultyName }}</td>
                <td>{{ course.departmentName }}</td>
                <td>{{ course.teacherName }}</td>
                <td>{{ course.year }}</td>
                <td>{{ course.level }}</td>
                <td>{{ course.creditsAmount }}</td>
                <td>{{ course.hoursAmount }}</td>
                <td>
                  <button class="edit-btn btn btn-light btn-sm">Edit</button>
                </td>
                <td>
                  <button class="delete-btn btn btn-sm">Delete</button>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
          <Pagination @updateCurrentPage="handleUpdateCurrentPage" :pagination-metadata="paginationMetadata" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table th,
.table td {
  padding: 1rem;
  vertical-align: top;
}

.delete-btn {
  background-color: #f30e7d;
  color: white;
}

.delete-btn:hover {
  background-color: #93094b;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Course } from "@/models/course";
import type { PaginationMetadata } from "@/models/pagination-metadata";
import {getCourses} from "@/scripts/fetch";
import Pagination from "@/components/Pagination.vue";

const loading = ref(false);
const error = ref(false);
const courses = ref([] as Course[]);
const paginationMetadata = ref({} as PaginationMetadata);
const currentPage = ref(1);

watch(currentPage, async () => await fetchCoursesForPage(currentPage.value), { immediate: true });

async function fetchCoursesForPage(page: number) {
  loading.value = true;

  try {
    const paginatedCourses = await getCourses({take: 5, page});

    courses.value = paginatedCourses.data;
    paginationMetadata.value = paginatedCourses.meta;
  } catch (err) {
    console.log((err as Error).message);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

function handleUpdateCurrentPage(page: number) {
  currentPage.value = page;
}
</script>
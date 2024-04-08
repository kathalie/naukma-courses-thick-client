<template>
  <div class="courses">
    <Breadcrumbs/>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <table class="table">
              <thead>
              <tr>
                <th>Код</th>
                <th>Назва</th>
                <th>Факультет</th>
                <th>Рік</th>
              </tr>
              </thead>
              <tbody v-if="loading" class="loading">Завантаження...</tbody>

              <tbody v-else-if="error" class="error">Не вдалося завантажити курси.</tbody>

              <tbody v-else-if="courses.length === 0">Курси не знайдено.</tbody>

              <tbody v-else class="content">
              <tr v-for="course in courses"
                  :key="course.code">
                <td>{{ course.code }}</td>
                <td>{{ course.name }}</td>
                <td>{{ course.facultyName }}</td>
                <td>{{ course.year }}</td>
                <td>
                  <router-link :to="{ name: RouteNames.courseDetails, params: { code: course.code } }">
                    Детальніше...
                  </router-link>
                </td>
              </tr>
              </tbody>
            </table>

            <!-- Pagination -->
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item"
                    v-for="page in paginationMetadata.pageCount"
                    :key="page"
                    :class="{ active: page === currentPage }">
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === paginationMetadata.pageCount }">
                  <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Course } from "@/models/course";
import type { PaginationMetadata } from "@/models/pagination-metadata";
import {getCourses} from "@/scripts/fetch";
import {RouteNames} from "@/common/constants";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

const loading = ref(false);
const error = ref(false);
const courses = ref([] as Course[]);
const paginationMetadata = ref({} as PaginationMetadata);
const currentPage = ref(1);

watch(currentPage, async () => await fetchCoursesForPage(currentPage.value), { immediate: true });

async function fetchCoursesForPage(page: number) {
  loading.value = true;

  try {
    const paginatedCourses = await getCourses({take: 4, page});

    courses.value = paginatedCourses.data;
    paginationMetadata.value = paginatedCourses.meta;
  } catch (err) {
    console.log((err as Error).message);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

function prevPage () {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage () {
  if (currentPage.value < paginationMetadata.value.pageCount) {
    currentPage.value++;
  }
}

function changePage (page: number) {
  if (currentPage.value !== page) {
    currentPage.value = page;
  }
}

</script>
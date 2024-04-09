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
<!--              <th scope="col"></th>-->
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
<!--                <td>-->
<!--                  <button class="btn btn-light btn-sm">Edit</button>-->
<!--                </td>-->
                <td>
                  <button class="btn accent-button btn-sm" @click="async() => await fetchDeleteCourse(course.code)">Delete</button>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
          <Pagination @updateCurrentPage="handleUpdateCurrentPage" :pagination-metadata="paginationMetadata" />
<!--          <button class="btn btn-dark">Створити новий курс</button>-->
          <input type="text" v-model="courseCode">
          <button class="btn accent-button" @click="addExistingCourse">Додати існуючий курс</button>
<!--          <button class="btn accent-button" @click="showAddExistingCourseModal">Додати існуючий курс</button>-->
<!--          <Modal v-model="isShownAddExistingCourse" :close="closeAddExistingCourseModal">-->
<!--            <div class="modal">-->
<!--              <p>Hello</p>-->
<!--              <button @click="closeAddExistingCourseModal">close</button>-->
<!--            </div>-->
<!--          </Modal>-->
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

.accent-button {
  background-color: #f30e7d;
  color: white;
}

.accent-button:hover {
  background-color: #93094b;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Course } from "@/models/course";
import type { PaginationMetadata } from "@/models/pagination-metadata";
import {addCourse, deleteCourse, getCourses} from "@/scripts/fetch";
import Pagination from "@/components/Pagination.vue";

const loading = ref(false);
const error = ref(false);
const courses = ref([] as Course[]);
const paginationMetadata = ref({} as PaginationMetadata);
const currentPage = ref(1);
const isShownAddExistingCourse = ref(false);
const courseCode = ref('');

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

function closeAddExistingCourseModal() {
  isShownAddExistingCourse.value = false;
}

function showAddExistingCourseModal() {
  isShownAddExistingCourse.value = true;
}

async function addExistingCourse() {
  console.log(courseCode.value)
  addCourse(courseCode.value)
      .then(async () => {
        alert("Successfully added course!");

        await fetchCoursesForPage(1);

        courseCode.value = ""
      })
      .catch(err => {
        switch (err.response.data.statusCode) {
          case 401: alert("Ви не авторизовані!"); break;
          case 403: alert("У Вас немає доступу до ресурсу!"); break;
          case 404: alert("Курс з таким кодом не знайдено!"); break;
          default: alert("Сталась непередбачувана помилка");
        }
      });
}

function fetchDeleteCourse(code: string) {
  const confirmed = confirm("Ви впевнені, що хочете видалити цей курс?");

  if (!confirmed) return;

  deleteCourse(code)
      .then(async () => {
        alert("Successfully deleted course!");

        await fetchCoursesForPage(1);
      })
      .catch(err => {
        switch (err.response.data.statusCode) {
          case 401: alert("Ви не авторизовані!"); break;
          case 403: alert("У Вас немає доступу до ресурсу!"); break;
          case 404: alert("Курс не знайдено"); break;
          default: alert("Сталась непередбачувана помилка");
        }
      });
}
</script>

<!--<style scoped >-->
<!--.modal {-->
<!--  width: 300px;-->
<!--  padding: 30px;-->
<!--  box-sizing: border-box;-->
<!--  background-color: #fff;-->
<!--  font-size: 20px;-->
<!--  text-align: center;-->
<!--}-->
<!--</style>-->
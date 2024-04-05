<template>
  <div class="container mt-5">
    <table class="table">
      <thead>
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th>Faculty</th>
        <th>Year</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="course in courses" :key="course.code">
        <td>{{ course.code }}</td>
        <td>{{ course.name }}</td>
        <td>{{ course.facultyName }}</td>
        <td>{{ course.year }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: paginationMetadata.page === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"
            v-for="page in paginationMetadata.pageCount"
            :key="page"
            :class="{ active: page === paginationMetadata.page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: paginationMetadata.page === paginationMetadata.pageCount }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Course } from "@/models/course";
import type { PaginationMetadata } from "@/models/pagination-metadata";
import {fetchCourses} from "@/scripts/fetch";

const loading = ref(false);
const courses = ref([] as Course[]);
const paginationMetadata = ref({} as PaginationMetadata);
const currentPage = ref(1);

watch(currentPage, async () => await fetchCoursesForPage(currentPage.value), { immediate: true });

async function fetchCoursesForPage(page: number) {
  loading.value = true;

  try {
    const paginatedCourses = await fetchCourses({take: 4, page});

    courses.value = paginatedCourses.data;
    paginationMetadata.value = paginatedCourses.meta;
  } catch (err) {
    alert("Failed to fetch courses!");
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
  currentPage.value = page;
}
</script>

<!--<script lang="ts">-->
<!--import { defineComponent, PropType, ref, watch } from 'vue';-->
<!--import type { Course } from "@/models/course";-->
<!--import type { PaginationMetadata } from "@/models/pagination-metadata";-->
<!--import { fetchCourses } from "@/scripts/fetch";-->

<!--export default defineComponent({-->
<!--  props: {-->
<!--    courses: {-->
<!--      type: Array as PropType<Course[]>,-->
<!--      required: true-->
<!--    },-->
<!--    paginationMetadata: {-->
<!--      type: Object as PropType<PaginationMetadata>,-->
<!--      required: true-->
<!--    }-->
<!--  },-->
<!--  setup(props, { emit }) {-->


<!--    const currentPage = ref(props.paginationMetadata.page);-->

<!--    watch(currentPage, (newValue) => {-->
<!--      fetchCoursesForPage(newValue);-->
<!--    });-->

<!--    const pageSize = props.paginationMetadata.itemCount;-->

<!--    const fetchCoursesForPage = (page: number) => {-->
<!--      fetchCourses({-->
<!--        take: 5,-->
<!--        page-->
<!--      })-->
<!--          .catch(err => {-->
<!--            console.log(err);-->
<!--            alert("Failed to fetch courses!");-->
<!--          })-->
<!--          .then(paginatedCourses => {-->
<!--            emit('page-changed', paginatedCourses!.data);-->
<!--          });-->
<!--    };-->

<!--    const prevPage = () => {-->
<!--      if (currentPage.value > 1) {-->
<!--        currentPage.value&#45;&#45;;-->
<!--      }-->
<!--    };-->

<!--    const nextPage = () => {-->
<!--      if (currentPage.value < props.paginationMetadata.pageCount) {-->
<!--        currentPage.value++;-->
<!--      }-->
<!--    };-->

<!--    const changePage = (page: number) => {-->
<!--      currentPage.value = page;-->
<!--    };-->

<!--    return { currentPage, pageSize, prevPage, nextPage, changePage };-->
<!--  }-->
<!--});-->
<!--</script>-->


<style>
/* Add your custom styles here */
</style>

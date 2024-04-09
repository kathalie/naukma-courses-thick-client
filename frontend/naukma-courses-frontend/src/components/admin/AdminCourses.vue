<template>
  <div class="col-md-9 ms-sm-auto col-lg-9 px-md-4">
    <div class="container">
      <div v-if="activeTab === 'courses'">
        <table class="table">
          <thead>
          <tr>
            <th>Course Code</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="course in courses" :key="course.id">
            <td>{{ course.code }}</td>
            <td>
              <button class="btn btn-primary btn-sm">Edit</button>
              <button class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-primary mb-3" @click="showAddCourseModal = true">Add Course</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('courses');
const showAddCourseModal = ref(false);
const courses = ref([
  { id: 1, code: 'CSE101' },
  { id: 2, code: 'MAT201' },
  { id: 3, code: 'PHY301' }
]);


</script>

<style scoped>
.container {
  margin-top: 60px;
}

.col-md-9 {
  padding: 20px;
}
</style>

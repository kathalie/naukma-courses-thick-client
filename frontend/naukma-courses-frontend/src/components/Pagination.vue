<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': !paginationMetadata.hasPreviousPage }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
          v-for="page in paginationMetadata.pageCount"
          :key="page"
          :class="{ 'active': page === +paginationMetadata.page }">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled': !paginationMetadata.hasNextPage }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {defineEmits, defineProps} from 'vue';
import type { PaginationMetadata } from "@/models/pagination-metadata";

const props = defineProps({
  paginationMetadata: {
    type: Object as () => PaginationMetadata,
    required: true
  }
});

const emits = defineEmits(['updateCurrentPage']);

function updateCurrentPage(page: number) {
  emits('updateCurrentPage', page);
}

function prevPage () {
  if (props.paginationMetadata?.hasPreviousPage) {
    updateCurrentPage(+props.paginationMetadata.page - 1)
  }
}

function nextPage () {
  if (props.paginationMetadata?.hasNextPage) {
    updateCurrentPage(+props.paginationMetadata.page + 1)
  }
}

function changePage (page: number) {
  if (+props.paginationMetadata?.page !== page) {
    updateCurrentPage(page);
  }
}

</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

.page-item {
  cursor: pointer;
}

.page-link {
  color: #FC0E6D;
  background-color: transparent;
  border: none;
  transition: color 0.3s;
}

.page-link:hover {
  color: #ff007f;
}

.page-item.disabled .page-link {
  color: #6c757d;
}

.page-item.active .page-link {
  z-index: 1;
  color: #fff;
  background-color: #FC0E6D;
  border-color: #FC0E6D;
}
</style>
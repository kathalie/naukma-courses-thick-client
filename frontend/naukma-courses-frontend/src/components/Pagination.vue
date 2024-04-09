<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !paginationMetadata.hasPreviousPage }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
          v-for="page in paginationMetadata.pageCount"
          :key="page"
          :class="{ active: page === +paginationMetadata.page }">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !paginationMetadata.hasNextPage }">
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
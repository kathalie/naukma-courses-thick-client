<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <router-link
            :to="breadcrumb.to"
            class="breadcrumb-link"
            :class="{ 'active': index !== breadcrumbs.length - 1 }"
        >
          {{ breadcrumb.text }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const breadcrumbs = computed(() => {
  const generatedBreadcrumbs = [];
  let pathArray = route.path.split('/')
  pathArray.shift()

  let breadcrumb = ''
  let lastIndexFound = 0
  for (let i = 0; i < pathArray.length; ++i) {
    breadcrumb = `${breadcrumb}/${pathArray[i]}`;

    const matched = route.matched[i];

    if (matched) {
      generatedBreadcrumbs.push({
        to: i !== 0 && pathArray[i - (i - lastIndexFound)]
            ? '/' + pathArray[i - (i - lastIndexFound)] + breadcrumb
            : breadcrumb,
        text: matched.meta.breadcrumb
      })
      lastIndexFound = i
      breadcrumb = ''
    }
  }

  return generatedBreadcrumbs;
})

</script>

<style scoped>
.breadcrumb {
  background-color: #f8f9fa;
  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
}

.breadcrumb-link {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb-link.active {
  color: #FC0E6D;

  &:hover {
    color: #020001;
  }
}
</style>
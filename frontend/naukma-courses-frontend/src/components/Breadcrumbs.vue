<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <router-link v-for="(breadcrumb, index) in breadcrumbs"
                   :key="index"
                   :to="breadcrumb.to"
                   class="breadcrumb-item"
                   :class="{ active: index === breadcrumbs.length - 1 }">
        {{ breadcrumb.text }}
      </router-link>
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

<!--<template>-->
<!--  <nav aria-label="breadcrumb">-->
<!--    <ol class="breadcrumb">-->
<!--      <li class="breadcrumb-item" v-for="(breadcrumb, index) in breadcrumbs" :key="index">-->
<!--        <router-link :to="breadcrumb.to">{{ breadcrumb.label }}</router-link>-->
<!--      </li>-->
<!--    </ol>-->
<!--  </nav>-->
<!--</template>-->

<!--<script setup>-->
<!--import { computed, watch, onMounted } from 'vue';-->
<!--import { useRoute } from 'vue-router';-->

<!--const route = useRoute();-->

<!--const breadcrumbs = computed(() => {-->
<!--  const matchedRoutes = route.matched;-->

<!--  return matchedRoutes.map(route => ({-->
<!--    label: route.meta.breadcrumb || route.name,-->
<!--    to: route.path-->
<!--  }));-->
<!--});-->

<!--onMounted(() => {-->
<!--  watch(route, () => {-->
<!--    updateBreadcrumbs();-->
<!--  });-->
<!--});-->

<!--function updateBreadcrumbs() {-->
<!--  // The breadcrumbs computed property will automatically update-->
<!--}-->
<!--</script>-->

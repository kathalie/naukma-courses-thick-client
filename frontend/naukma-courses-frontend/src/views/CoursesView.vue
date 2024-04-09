<template>
  <div id="app">
    <UpperBar caption="Доступні курси"/>

    <CoursesTable />
  </div>
</template>

<script>
import CoursesTable from "../components/CoursesTable.vue";
import UpperBar from "@/components/layout-components/UpperBar.vue";

export default {
  components: {
    UpperBar,
    CoursesTable
  },
};
</script>
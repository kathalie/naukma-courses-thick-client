<template>
  <div class="container-fluid">
    <div class="row">
      <UpperBar caption="Панель адміністратора"/>

      <Sidebar :menuItems="sidebarMenuItems" />

      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
import UpperBar from "@/components/layout-components/UpperBar.vue";
import Sidebar from "@/components/layout-components/Sidebar.vue";
import {RouteNames} from "@/common/constants";

const sidebarMenuItems = [
  { caption: 'Курси', routeName: RouteNames.adminCourses },
  { caption: 'Користувачі', routeName: RouteNames.adminUsers },
];
</script>
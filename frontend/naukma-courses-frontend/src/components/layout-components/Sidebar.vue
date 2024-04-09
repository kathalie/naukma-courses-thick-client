<template>
  <nav id="sidebar" class="col-md-3 bg-dark text-white">
    <ul class="list-unstyled components">
      <li v-for="item in menuItems" :key="item.routeName" :class="{ active: item.routeName === activeTab }">
        <router-link
            :to="{ name: item.routeName }"
            class="btn btn-link sidebar-link"
            @click="activeTab = item.routeName"
        >
          {{ item.caption }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
  menuItems: {
    type: Array as () => ({ caption: string, routeName: string }[]),
    required: true
  }
});

const activeTab = ref(props.menuItems[0]?.routeName);

</script>

<style scoped>
#sidebar {
  height: calc(100vh - 50px);
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 1;
  overflow-y: auto;
  padding-top: 1rem;
  transition: all 0.3s;
}

.components {
  padding-top: 1rem;
}

.sidebar-link {
  width: 100%;
  text-align: left;
  color: #fff;
  padding: 1rem;
  transition: all 0.3s;
}

.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.components li.active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>

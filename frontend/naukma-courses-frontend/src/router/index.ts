import { createRouter, createWebHistory } from 'vue-router';
import CoursesView from "@/views/CoursesView.vue";
import CourseDetailsView from "@/views/CourseDetailsView.vue";
import {RouteNames} from "@/common/constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      // TODO redirect
    // {
    //   path: '/',
    //   name: RouteNames.home,
    //   component: CoursesView,
    //   meta: {
    //     breadcrumb: 'Courses'
    //   }
    // },
    {
      path: "/courses",
      meta: {
        breadcrumb: "Курси"
      },
      children: [
        {
          path: "",
          name: RouteNames.courses,
          component: CoursesView,
        },
        {
          path: ":code",
          name: RouteNames.courseDetails,
          component: CourseDetailsView,
          meta: {
            breadcrumb: "Деталі курсу"
          }
        },
      ]
    },
  ]
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import CoursesView from "@/views/CoursesView.vue";
import CourseDetailsView from "@/views/CourseDetailsView.vue";
import {RouteNames} from "@/common/constants";
import AdminLoginView from "@/views/AdminLoginView.vue";
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminCourses from "@/components/admin/AdminCourses.vue";
import AdminUsers from "@/components/admin/AdminUsers.vue";

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
    {
      path: "/admin",
      children: [
        {
          path: "login",
          name: RouteNames.adminLogin,
          component: AdminLoginView,
        },
        {
          path: "home",
          component: AdminHomeView,
          redirect: {name: RouteNames.adminCourses},
          children: [
            {
              path: "courses",
              name: RouteNames.adminCourses,
              component: AdminCourses,
            },
            {
              path: "users",
              name: RouteNames.adminUsers,
              component: AdminUsers,
            }
          ]
        },
      ]
    },
  ]
});

export default router;

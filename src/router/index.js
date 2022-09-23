import Vue from "vue";
import router from "vue-router";
import news from "@/views/news";
import details from "@/views/details";
import notFoundComponent from "@/views/page404";

Vue.use(router);

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return (
//       savedPosition ||
//       new Promise(resolve => {
//         setTimeout(() => resolve({ top: 0 }), 300);
//       })
//     );
//   }
// });

const ROUTE_NAME = {
  DETAILS: "details"
};

export default new router({
  routes: [
    {
      path: "/",
      name: "news",
      component: news
    },
    {
      path: "/" + ROUTE_NAME.DETAILS + "/:id",
      name: ROUTE_NAME.DETAILS,
      component: details,
      props: true
    },
    {
      path: "*",
      component: notFoundComponent
    }
  ]
  // router
});

export { ROUTE_NAME };

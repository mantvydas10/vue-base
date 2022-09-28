import Vue from "vue";
import Router from "vue-router";
import news from "@/views/news";
import details from "@/views/details";
import notFoundComponent from "@/views/page404";

Vue.use(Router);

const ROUTE_NAME = {
  DETAILS: "details"
};

export default new Router({
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
});

export { ROUTE_NAME };

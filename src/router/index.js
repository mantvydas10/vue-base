import Vue from "vue";
import Router from "vue-router";
import news from "@/views/news";
import details from "@/views/details";
import notFoundComponent from "@/views/page404";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "news",
      component: news
    },
    {
      path: "/details/:id",
      name: "details",
      component: details
    },
    {
      path: "*",
      component: notFoundComponent
    }
  ]
});

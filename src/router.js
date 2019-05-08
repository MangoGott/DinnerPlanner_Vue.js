import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/components/Welcome";
import SelectDish from "@/components/SelectDish";
import Overview from "@/components/Overview";
import DishDetail from "@/components/DishDetail";
import modelInstance from "@/data/DinnerModel";
import Print from "@/components/Print";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/overview",
      name: "Overview",
      component: Overview,
      props: { model: modelInstance }
    },
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/search",
      name: "SelectDish",
      component: SelectDish,
      props: { model: modelInstance }
    }, 
    {
      path: "/dishdetail",
      name: "DishDetail",
      component: DishDetail,
      props: { model: modelInstance}

    },
    {
      path: "/print",
      name: "Print",
      component: Print,
      props: { model: modelInstance }
    }
  ]
});
export default {
  name: "user",
  component: () => import("../../../layouts/Layout.vue"),
  children: [
    /* {
      path: "",
      name: "plan",
      component: () => import("../views/AnnualResultPlan.vue"),
    }, */
    {
      path: "plan",
      name: "planvv",
      component: () => import("../views/AnnualResultPlan.vue"),
    },
    {
      path: "planitem",
      name: "planitem",
      component: () => import("../views/AnnualResultPlanItems.vue"),
    },
  ],
};

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
      path: "",
      name: "pl",
      component: () => import("../views/AnnualResultPlan.vue"),
    },
    {
      path: ":idIndicator",
      name: "planitem",
      component: () => import("../views/AnnualResultPlanItems.vue"),
    },
  ],
};

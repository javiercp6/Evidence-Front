export default {
  name: "users",
  component: () => import("../../../layouts/Layout.vue"),
  children: [
    {
      path: "",
      name: "usersIndex",
      component: () => import("../views/usersIndex.vue"),
    },
    {
      path: ":idUser",
      name: "planUser",
      component: () => import("../../User/views/AnnualResultPlan.vue"),
    },
  ],
};

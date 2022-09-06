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
      name: "userItems",
      component: () => import("../views/userItems.vue"),
    },
    {
      path: "indicator" + ":idIndicator",
      name: "userIndicator",
      component: () => import("../views/userIndicator.vue"),
    },
    {
      path: "evaluacion" + ":idUser",
      name: "userEvaluation",
      component: () => import("../views/userEvaluation.vue"),
    },
  ],
};

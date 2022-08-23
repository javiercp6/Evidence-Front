export default {
  name: "evaluacion",
  component: () => import("../../../layouts/Layout.vue"),
  children: [
    {
      path: "",
      name: "evaluacionIndex",
      component: () => import("../views/Evaluation.vue"),
    },
  ],
};

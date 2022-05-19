export default {
  name: "resultsarea",
  component: () => import("../../../layouts/Layout.vue"),
  children: [
    {
      path: "",
      name: "resultsareaindex",
      component: () => import("../views/ResultsAreaIndex.vue"),
    },
    {
      path: "resultsareaitems",
      name: "resultsareaitems",
      component: () => import("../views/ResultsAreaItems.vue"),
    },
  ],
};

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
      path: ":idArea",
      name: "areaitems",
      component: () => import("../views/ResultsAreaItems.vue"),
      props: (route) => {
        const { idArea } = route.params;
        return { idArea };
      },
    },
  ],

  /* name: "indicator",
  component: () => import("../../../layouts/Layout.vue"),
  children: [
    {
      path: "",
      name: "indicatorboss",
      component: () => import("../views/Indicatorboss.vue"),
    },
  ], */
};

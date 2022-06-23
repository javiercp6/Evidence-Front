export default {
  name: "indicator",
  component: () => import("../../../layouts/Layout.vue"),
  children: [
    {
      path: "",
      name: "indicatorboss",
      component: () => import("../views/IndicatorBoss.vue"),
    },
  ],
};

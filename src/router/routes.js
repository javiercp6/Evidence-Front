import authRouter from "../Modules/auth/router";
import isAuthenticatedGuard from "src/Modules/auth/router/auth-guard";
import userRouter from "../Modules/User/router";
import resultsareaRouter from "../Modules/Results Area/router";
import indicatorBossRouter from "../Modules/Results Area/router/indicator";
import usersRouter from "../Modules/Users/router";

const routes = [
  {
    path: "/",
    component: () => import("layouts/LayoutIndexPage.vue"),
    /* beforeEnter: [isAuthenticatedGuard], */
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/auth",
    ...authRouter,
  },
  {
    path: "/user",
    ...userRouter,
  },
  {
    path: "/area",
    ...resultsareaRouter,
  },
  {
    path: "/indicadores",
    ...indicatorBossRouter,
  },
  {
    path: "/usuarios",
    ...usersRouter,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

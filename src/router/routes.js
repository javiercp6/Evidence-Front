import authRouter from "../Modules/auth/router";
import isAuthenticatedGuard from "src/Modules/auth/router/auth-guard";
import isAdminGuard from "src/Modules/auth/router/admin-guard";
import isUserGuard from "src/Modules/auth/router/user-guard";
import userRouter from "../Modules/User/router";
import evaluationUserRouter from "../Modules/User/router/evaluation";
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
    beforeEnter: [isAuthenticatedGuard, isUserGuard],
    ...userRouter,
  },
  {
    path: "/evaluacion",
    beforeEnter: [isAuthenticatedGuard, isUserGuard],
    ...evaluationUserRouter,
  },
  {
    path: "/area",
    beforeEnter: [isAuthenticatedGuard, isAdminGuard],
    ...resultsareaRouter,
  },
  {
    path: "/indicadores",
    beforeEnter: [isAuthenticatedGuard, isAdminGuard],
    ...indicatorBossRouter,
  },
  {
    path: "/usuarios",
    beforeEnter: [isAuthenticatedGuard, isAdminGuard],
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

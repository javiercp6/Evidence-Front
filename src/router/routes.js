import authRouter from "../Modules/auth/router";
import isAuthenticatedGuard from "src/Modules/auth/router/auth-guard";
import userRouter from "../Modules/User/router";
import resultsareaRouter from "../Modules/Results Area/router";

const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    beforeEnter: [isAuthenticatedGuard],
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

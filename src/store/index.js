// import { store } from 'quasar/wrappers'
// import { createStore } from 'vuex'
//
//  import auth from '../Modules/auth/store'
//
// /*
//  * If not building with SSR mode, you can
//  * directly export the Store instantiation;
//  *
//  * The function below can be async too; either use
//  * async/await or return a Promise which resolves
//  * with the Store instance.
//  */
//
// export default store(function (/* { ssrContext } */) {
//   const Store = createStore({
//     modules: {
//       auth
//     },
//
//     // enable strict mode (adds overhead!)
//     // for dev mode and --debug builds only
//     strict: process.env.DEBUGGING
//   })
//
//   return Store
// })
import { createStore } from "vuex";

import auth from "../modules/auth/store";
import area from "../modules/Results Area/store";
import indicator from "../modules/User/store";

const store = createStore({
  modules: {
    auth,
    area,
    indicator,
  },
});

export default store;

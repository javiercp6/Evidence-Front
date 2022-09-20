import store from "../../../store";
import { computed } from "vue";

import { mapGetters } from "vuex";

const isAdminGuard = async (to, from, next) => {
  console.log(store);
  const role = computed(() => store.getters["auth/role"]);

  if (role.value === "ROLE_ADMIN") next();
  else next({ path: "/" });
};

export default isAdminGuard;
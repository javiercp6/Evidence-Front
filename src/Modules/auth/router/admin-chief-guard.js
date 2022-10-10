import store from "../../../store";
import { computed } from "vue";

import { mapGetters } from "vuex";

const isAdminGuard = async (to, from, next) => {
  const role = computed(() => store.getters["auth/role"]);

  if (role.value === "ROLE_ADMIN" || role.value === "ROLE_CHIEF") next();
  else next({ path: "/" });
};

export default isAdminGuard;

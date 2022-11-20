import store from "../../../store";
import { computed } from "vue";

import { mapGetters } from "vuex";

const isUserAdminGuard = async (to, from, next) => {
  const role = computed(() => store.getters["auth/role"]);

  if (
    role.value === "ROLE_USER" ||
    role.value === "ROLE_CHIEFA" ||
    role.value === "ROLE_CHIEFD"
  )
    next();
  else next({ path: "/" });
};

export default isUserAdminGuard;

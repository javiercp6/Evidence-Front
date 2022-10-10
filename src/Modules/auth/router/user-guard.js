import store from "../../../store";
import { computed } from "vue";

import { mapGetters } from "vuex";

const isUserGuard = async (to, from, next) => {
  const role = computed(() => store.getters["auth/role"]);

  if (role.value === "ROLE_USER") next();
  else next({ path: "/" });
};

export default isUserGuard;

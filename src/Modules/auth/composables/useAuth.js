import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    const resp = await store.dispatch("auth/createUser", user);
    return resp;
  };

  const loginUser = async (user) => {
    const resp = await store.dispatch("auth/signInUser", user);
    return resp;
  };

  const checkAuthStatus = async () => {
    const resp = await store.dispatch("auth/checkAuthentication");
    return resp;
  };

  const logout = () => {
    store.commit("auth/logout");
    //store.commit('journal/clearEntries')
  };

  const changePassword = async (passwords) => {
    const pass = {
      oldpassword: passwords.oldpassword,
      newpassword: passwords.newpassword,
    };
    const resp = await store.dispatch("auth/changePassword", pass);
    return resp;
  };

  return {
    checkAuthStatus,
    createUser,
    loginUser,
    logout,
    changePassword,

    authStatus: computed(() => store.getters["auth/currentState"]),
    username: computed(() => store.getters["auth/username"]),
    uid: computed(() => store.getters["auth/uid"]),
    role: computed(() => store.getters["auth/role"]),
  };
};

export default useAuth;

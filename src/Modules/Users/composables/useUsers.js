import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const useUsers = () => {
  const store = useStore();
  const $q = useQuasar();

  const getUsers = async () => {
    $q.loading.show();
    const resp = await store.dispatch("users/getUsers");
    if (!resp.ok) {
      $q.notify({
        message: resp.message || "Error inesperado",
        color: "negative",
      });
    }
    $q.loading.hide();
    return resp;
  };

  const createUser = async (user) => {
    $q.loading.show();
    const resp = await store.dispatch("users/createUser", user);
    $q.loading.hide();
    return resp;
  };

  const editUser = async (user) => {
    $q.loading.show();
    const resp = await store.dispatch("users/editUser", user);
    $q.loading.hide();
    return resp;
  };

  const deleteUser = async (idUser) => {
    $q.loading.show();
    const resp = await store.dispatch("users/deleteUser", idUser);
    $q.loading.hide();
    return resp;
  };

  /*  const getAreaById = async (idArea) => {
    const resp = await store.dispatch("area/getAreaById", idArea);
    return resp;
  }; */

  return {
    getUsers,
    createUser,
    editUser,
    deleteUser,
    users: computed(() => store.getters["users/users"]),
    indicatorsModel: computed(() => store.getters["area/indicatorsModel"]),
  };
};

export default useUsers;

import { computed } from "vue";
import { useStore } from "vuex";

const useUsers = () => {
  const store = useStore();

  const getUsers = async () => {
    const resp = await store.dispatch("users/getUsers");
    return resp;
  };

  const createUser = async (user) => {
    const resp = await store.dispatch("users/createUser", user);
    return resp;
  };

  const editUser = async (user) => {
    const resp = await store.dispatch("users/editUser", user);
    return resp;
  };

  const deleteUser = async (idUser) => {
    const resp = await store.dispatch("users/deleteUser", idUser);
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

import { computed } from "vue";
import { useStore } from "vuex";

const useUsers = () => {
  const store = useStore();

  const getUsers = async () => {
    const resp = await store.dispatch("area/getUsers");
    return resp;
  };
  const getAreaById = async (idArea) => {
    const resp = await store.dispatch("area/getAreaById", idArea);
    return resp;
  };

  return {
    getUsers,
    getAreaById,

    users: computed(() => store.getters["area/users"]),
    indicatorsModel: computed(() => store.getters["area/indicatorsModel"]),
  };
};

export default useUsers;

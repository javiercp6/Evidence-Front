import { computed } from "vue";
import { useStore } from "vuex";

const useArea = () => {
  const store = useStore();

  const getArea = async () => {
    const resp = await store.dispatch("area/getArea");
    return resp;
  };
  const getAreaById = async (idArea) => {
    const resp = await store.dispatch("area/getAreaById", idArea);
    return resp;
  };
  const createArea = async (area) => {
    const resp = await store.dispatch("area/createArea", area);
    return resp;
  };
  const editArea = async (area) => {
    const resp = await store.dispatch("area/editArea", area);
    return resp;
  };

  const deleteArea = async (idArea) => {
    const resp = await store.dispatch("area/deleteArea", idArea);
    return resp;
  };

  const createCriterion = async (criterion) => {
    const resp = await store.dispatch("area/createCriterion", criterion);
    return resp;
  };

  const createObjective = async (objective) => {
    const resp = await store.dispatch("area/createObjective", objective);
    return resp;
  };

  const deleteObjective = async (idObjective) => {
    const resp = await store.dispatch("area/deleteObjective", idObjective);
    return resp;
  };

  return {
    getArea,
    getAreaById,
    createArea,
    editArea,
    deleteArea,
    createCriterion,
    createObjective,
    deleteObjective,
    areas: computed(() => store.getters["area/areas"]),
    area: computed(() => store.getters["area/area"]),
  };
};

export default useArea;

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

  //Quitar editArea en store
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

  const editCriterion = async (criterion) => {
    const resp = await store.dispatch("area/editCriterion", criterion);
    return resp;
  };

  const deleteCriterion = async (criterion) => {
    const resp = await store.dispatch("area/deleteCriterion", criterion);
    return resp;
  };

  const createObjective = async (objective) => {
    const resp = await store.dispatch("area/createObjective", objective);
    return resp;
  };

  const editObjective = async (objective) => {
    const resp = await store.dispatch("area/editObjective", objective);
    return resp;
  };

  const deleteObjective = async (objective) => {
    const resp = await store.dispatch("area/deleteObjective", objective);
    return resp;
  };

  const getIndicatorsModel = async () => {
    const resp = await store.dispatch("area/getIndicatorsModel");
    return resp;
  };

  const removeIndicatorModel = (idIndicator) => {
    store.commit("area/removeIndicatorModel", idIndicator);
  };

  const createIndicator = async (indicator) => {
    const resp = await store.dispatch("area/createIndicator", indicator);
    return resp;
  };

  const editIndicator = async (indicator) => {
    const resp = await store.dispatch("area/editIndicator", indicator);
    return resp;
  };

  const deleteIndicator = async (indicator) => {
    const resp = await store.dispatch("area/deleteIndicator", indicator);
    return resp;
  };

  return {
    getArea,
    getAreaById,
    createArea,
    editArea,
    deleteArea,
    createCriterion,
    editCriterion,
    deleteCriterion,
    createObjective,
    editObjective,
    deleteObjective,
    getIndicatorsModel,
    removeIndicatorModel,
    createIndicator,
    editIndicator,
    deleteIndicator,
    areas: computed(() => store.getters["area/areas"]),
    area: computed(() => store.getters["area/area"]),
    indicatorsModel: computed(() => store.getters["area/indicatorsModel"]),
  };
};

export default useArea;

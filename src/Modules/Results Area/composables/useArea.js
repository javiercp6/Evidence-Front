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

  const getIndicatorsModel = async () => {
    const resp = await store.dispatch("area/getIndicatorsModel");
    return resp;
  };

  const removeIndicatorModel = (idIndicator) => {
    store.commit("area/removeIndicatorModel", idIndicator);
  };

  const estabilishIndicator = async (indicatorsModel, idUser) => {
    const idsIndicator = [];
    indicatorsModel.forEach((indicator) => {
      for (let i = 0; i < indicator.indicators.length; i++) {
        idsIndicator.push({ _id: indicator.indicators[i]._id });
      }
    });
    const indicatorsModelTo = { idsIndicator, idUser };
    console.log(indicatorsModelTo);
    const resp = await store.dispatch(
      "area/estabilishIndicator",
      indicatorsModelTo
    );
    return resp;
  };

  const createIndicator = async (indicator) => {
    const resp = await store.dispatch("area/createIndicator", indicator);
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
    getIndicatorsModel,
    estabilishIndicator,
    removeIndicatorModel,
    createIndicator,
    areas: computed(() => store.getters["area/areas"]),
    area: computed(() => store.getters["area/area"]),
    indicatorsModel: computed(() => store.getters["area/indicatorsModel"]),
  };
};

export default useArea;

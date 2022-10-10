import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const useArea = () => {
  const store = useStore();
  const $q = useQuasar();

  const getArea = async () => {
    $q.loading.show();
    const resp = await store.dispatch("area/getArea");
    $q.loading.hide();
    return resp;
  };
  const getAreaById = async (idArea) => {
    $q.loading.show();
    const resp = await store.dispatch("area/getAreaById", idArea);
    $q.loading.hide();
    return resp;
  };
  const createArea = async (area) => {
    $q.loading.show();
    const aux = [];
    area.objectives.forEach((element, index) => {
      if (element) {
        if (element.length !== 0) {
          //area.objectives.splice(index, 1);
          aux.push(element);
        }
      }
    });

    area.objectives = aux;

    const resp = await store.dispatch("area/createArea", area);
    $q.loading.hide();
    return resp;
  };

  //Quitar editArea en store
  const editArea = async (area) => {
    $q.loading.show();
    const resp = await store.dispatch("area/editArea", area);
    $q.loading.hide();
    return resp;
  };

  const deleteArea = async (idArea) => {
    $q.loading.show();
    const resp = await store.dispatch("area/deleteArea", idArea);
    $q.loading.hide();
    return resp;
  };

  const createCriterion = async (criterion) => {
    $q.loading.show();
    const resp = await store.dispatch("area/createCriterion", criterion);
    $q.loading.hide();
    return resp;
  };

  const editCriterion = async (criterion) => {
    $q.loading.show();
    const resp = await store.dispatch("area/editCriterion", criterion);
    $q.loading.hide();
    return resp;
  };

  const deleteCriterion = async (criterion) => {
    $q.loading.show();
    const resp = await store.dispatch("area/deleteCriterion", criterion);
    $q.loading.hide();
    return resp;
  };

  const createObjective = async (objective) => {
    $q.loading.show();
    const aux = [];
    objective.criterions.forEach((element) => {
      if (element) {
        if (element.length !== 0) {
          //area.objectives.splice(index, 1);
          aux.push(element);
        }
      }
    });

    objective.criterions = aux;
    const resp = await store.dispatch("area/createObjective", objective);
    $q.loading.hide();
    return resp;
  };

  const editObjective = async (objective) => {
    $q.loading.show();
    const resp = await store.dispatch("area/editObjective", objective);
    $q.loading.hide();
    return resp;
  };

  const deleteObjective = async (objective) => {
    $q.loading.show();
    const resp = await store.dispatch("area/deleteObjective", objective);
    $q.loading.hide();
    return resp;
  };

  const getIndicatorsModel = async () => {
    $q.loading.show();
    const resp = await store.dispatch("area/getIndicatorsModel");
    $q.loading.hide();
    return resp;
  };

  const removeIndicatorModel = (idIndicator) => {
    $q.loading.show();
    store.commit("area/removeIndicatorModel", idIndicator);
    $q.loading.hide();
  };

  const createIndicator = async (indicator) => {
    $q.loading.show();
    const resp = await store.dispatch("area/createIndicator", indicator);
    $q.loading.hide();
    return resp;
  };

  const editIndicator = async (indicator) => {
    $q.loading.show();
    const resp = await store.dispatch("area/editIndicator", indicator);
    $q.loading.hide();
    return resp;
  };

  const deleteIndicator = async (indicator) => {
    $q.loading.show();
    const resp = await store.dispatch("area/deleteIndicator", indicator);
    $q.loading.hide();
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

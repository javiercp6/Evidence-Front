import { computed, ref, inject } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { api } from "boot/axios";

const useArea = () => {
  const store = useStore();
  const $q = useQuasar();
  const year = inject("year");

  const getArea = async (year) => {
    $q.loading.show();
    const resp = await store.dispatch("area/getArea", year);
    $q.loading.hide();
    return resp;
  };
  const getAreaById = async (idArea) => {
    $q.loading.show();
    const resp = await store.dispatch("area/getAreaById", idArea);
    $q.loading.hide();
    return resp;
  };
  const createArea = async (area, year) => {
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
    area.year = year;

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
    console.log(year);
    $q.loading.show();
    const resp = await store.dispatch("area/getIndicatorsModel", year.value);
    $q.loading.hide();
    return resp;
  };

  const removeIndicatorModel = (idIndicator) => {
    $q.loading.show();
    store.commit("area/removeIndicatorModel", idIndicator);
    $q.loading.hide();
  };

  const createIndicator = async (indicator) => {
    indicator.year = year;
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

  const getYears = async () => {
    $q.loading.show();
    const resp = await store.dispatch("area/getYears");
    $q.loading.hide();
    return resp;
  };
  const getYear = async (yearParam) => {
    $q.loading.show();
    console.log(year);
    if (yearParam) {
      const { data } = await api.get(`/years/last`);
      //const resp = await store.dispatch("area/getYear");
      year.value = data;
    }
    if (!year.value) {
      const { data } = await api.get(`/years/last`);
      //const resp = await store.dispatch("area/getYear");
      year.value = data;
    }
    $q.loading.hide();
    //return resp;
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
    getYears,
    getYear,
    areas: computed(() => store.getters["area/areas"]),
    area: computed(() => store.getters["area/area"]),
    indicatorsModel: computed(() => store.getters["area/indicatorsModel"]),
    years: computed(() => store.getters["area/years"]),
    //year: computed(() => store.getters["area/year"]),
    year,
  };
};

export default useArea;

import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const useUser = () => {
  const store = useStore();
  const $q = useQuasar();

  const getIndicatorsByUser = async (idUser) => {
    $q.loading.show();
    const resp = await store.dispatch("indicator/getIndicatorsByUser", idUser);
    $q.loading.hide();
    return resp;
  };
  const getIndicatorById = async (idIndicator) => {
    $q.loading.show();
    //const resp = store.commit("indicator/getIndicatorById", idIndicator);
    const resp = await store.dispatch(
      "indicator/getIndicatorById",
      idIndicator
    );
    $q.loading.hide();
    return resp;
  };

  const denyIndicator = async (idIndicator) => {
    $q.loading.show();
    const resp = await store.dispatch("indicator/denyIndicator", idIndicator);
    $q.loading.hide();
    return resp;
  };

  const createevidence = async (evidence) => {
    /* const file = new FormData();
    FormData.append("file", evidence.file);
    const evidenceTo = {
      idIndicator: evidence.idIndicator,
      description: evidence.description,
      FormData,
    }; */
    $q.loading.show();
    const resp = await store.dispatch("indicator/createevidence", evidence);
    $q.loading.hide();
    return resp;
  };

  const editevidence = async (evidence) => {
    $q.loading.show();
    const resp = await store.dispatch("indicator/editevidence", evidence);
    $q.loading.hide();
    return resp;
  };

  const deleteevidence = async (evidence) => {
    $q.loading.show();
    const resp = await store.dispatch("indicator/deleteevidence", evidence);
    $q.loading.hide();
    return resp;
  };

  const estabilishIndicator = async (indicatorsModel, idUser) => {
    $q.loading.show();
    const idsIndicator = [];
    //const objAux = {"_id": "62a803df7ac0a54e052bbaa9"}
    indicatorsModel.forEach((indicator) => {
      idsIndicator.push({ _id: indicator });
    });
    const indicatorsModelTo = { idsIndicator, idUser };
    const resp = await store.dispatch(
      "indicator/estabilishIndicator",
      indicatorsModelTo
    );
    $q.loading.hide();
    return resp;
  };

  const deleteIndicatorFromUser = async (idIndicator, idUser) => {
    $q.loading.show();
    const objectTo = { idIndicator, idUser };
    const resp = await store.dispatch(
      "indicator/deleteIndicatorFromUser",
      objectTo
    );
    $q.loading.hide();
    return resp;
  };

  const getEvaluationByUser = async (idUser) => {
    $q.loading.show();
    const resp = await store.dispatch("indicator/getEvaluationByUser", idUser);
    $q.loading.hide();
    return resp;
  };

  const createIndicatorsPersonal = async (indicatorPersonal, idUser) => {
    $q.loading.show();
    const indicadorPersonalTo = { indicatorPersonal, idUser };
    const resp = await store.dispatch(
      "indicator/createIndicatorsPersonal",
      indicadorPersonalTo
    );
    $q.loading.hide();
    return resp;
  };

  const createEvaluationValue = (evaluation) => {
    //const resp = store.dispatch("indicator/getEvaluationByUser", idUser);
    store.commit("indicator/createEvaluationValue", evaluation);

    /* return resp; */
  };

  const deleteEvaluationValue = () => {
    //const resp = store.dispatch("indicator/getEvaluationByUser", idUser);
    store.commit("indicator/deleteEvaluationValue");

    /* return resp; */
  };

  const createObservation = async (observation, _id) => {
    $q.loading.show();
    const resp = await store.dispatch("indicator/createObservation", {
      observation,
      _id,
    });
    $q.loading.hide();
    return resp;
  };

  const deleteObservation = async (_id) => {
    $q.loading.show();
    const resp = await store.dispatch("indicator/createObservation", {
      observation: null,
      _id,
    });
    $q.loading.hide();
    return resp;
  };

  return {
    getIndicatorsByUser,
    getIndicatorById,
    denyIndicator,
    createevidence,
    editevidence,
    deleteevidence,
    estabilishIndicator,
    deleteIndicatorFromUser,
    getEvaluationByUser,
    createIndicatorsPersonal,
    createEvaluationValue,
    deleteEvaluationValue,
    createObservation,
    deleteObservation,
    indicators: computed(() => store.getters["indicator/indicators"]),
    indicator: computed(() => store.getters["indicator/indicator"]),
    evaluation: computed(() => store.getters["indicator/evaluation"]),
    evaluationIndicators: computed(
      () => store.getters["indicator/evaluationIndicators"]
    ),
  };
};

export default useUser;

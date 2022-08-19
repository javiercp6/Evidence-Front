import { computed } from "vue";
import { useStore } from "vuex";

const useUser = () => {
  const store = useStore();

  const getIndicatorsByUser = async (idUser) => {
    const resp = await store.dispatch("indicator/getIndicatorsByUser", idUser);
    return resp;
  };
  const getIndicatorById = async (idIndicator) => {
    //const resp = store.commit("indicator/getIndicatorById", idIndicator);
    const resp = await store.dispatch(
      "indicator/getIndicatorById",
      idIndicator
    );
    return resp;
  };

  const denyIndicator = async (idIndicator) => {
    const resp = await store.dispatch("indicator/denyIndicator", idIndicator);
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
    const resp = await store.dispatch("indicator/createevidence", evidence);
    return resp;
  };

  const editevidence = async (evidence) => {
    const resp = await store.dispatch("indicator/editevidence", evidence);
    return resp;
  };

  const deleteevidence = async (evidence) => {
    const resp = await store.dispatch("indicator/deleteevidence", evidence);
    return resp;
  };

  const estabilishIndicator = async (indicatorsModel, idUser) => {
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
    indicators: computed(() => store.getters["indicator/indicators"]),
    indicator: computed(() => store.getters["indicator/indicator"]),
  };
};

export default useUser;

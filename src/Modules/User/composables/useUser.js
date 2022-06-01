import { computed } from "vue";
import { useStore } from "vuex";

const useUser = () => {
  const store = useStore();

  const getIndicators = async () => {
    const resp = await store.dispatch("indicator/getIndicators");
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

  const getFileById = async (idEvidence) => {
    const resp = await store.dispatch("indicator/getFileById", idEvidence);
    return resp;
  };

  return {
    getIndicators,
    getIndicatorById,
    createevidence,
    getFileById,
    indicators: computed(() => store.getters["indicator/indicators"]),
    indicator: computed(() => store.getters["indicator/indicator"]),
    file: computed(() => store.getters["indicator/file"]),
    //fil: computed(() => store.state.file),
  };
};

export default useUser;

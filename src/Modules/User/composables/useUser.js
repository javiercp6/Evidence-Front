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

  return {
    getIndicatorsByUser,
    getIndicatorById,
    createevidence,
    indicators: computed(() => store.getters["indicator/indicators"]),
    indicator: computed(() => store.getters["indicator/indicator"]),
  };
};

export default useUser;
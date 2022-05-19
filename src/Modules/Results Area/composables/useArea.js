import { computed } from "vue";
import { useStore } from "vuex";

const useArea = () => {
  const store = useStore();

  const getArea = async () => {
    console.log("resp");
    const resp = await store.dispatch("area/getArea");
    return resp;
  };
  const createArea = async () => {
    const resp = await store.dispatch("area/getArea");
    return resp;
  };

  return {
    getArea,

    areas: computed(() => store.getters["area/areas"]),
  };
};

export default useArea;

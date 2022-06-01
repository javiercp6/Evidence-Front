import state from "./state";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

const IndicatorModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default IndicatorModule;

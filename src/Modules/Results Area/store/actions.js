import { api } from "boot/axios";

// export const myAction = async ({ commit }) => {

// }
export const getArea = async ({ commit }) => {
  try {
    const { data } = await api.get("/areas");

    commit("getArea", data.areas);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const createArea = async ({ commit }, area) => {
  const { name, objectives } = area;

  try {
    const { data } = await api.post("/areas", area);

    commit("createArea", area);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

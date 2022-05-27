import { api } from "boot/axios";

// export const myAction = async ({ commit }) => {

// }
export const getArea = async ({ commit }) => {
  try {
    const { data } = await api.get("/areas");
    console.log(data);
    commit("getArea", data);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const getAreaById = async ({ commit }, idArea) => {
  try {
    const { data } = await api.get(`/areas/${idArea}`);
    console.log(data);
    commit("getAreaById", data);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const createArea = async ({ commit }, area) => {
  delete area.id;
  try {
    const { data } = await api.post("/areas", area);
    console.log(area);
    commit("createArea", data);
    return { ok: true };
  } catch (error) {
    console.log("mmmm");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const editArea = async ({ commit }, area) => {
  const { id, name, objectives } = area;

  const areaToSave = { _id: id, name, objectives };
  try {
    const { data } = await api.put(`/areas/${id}`, areaToSave);

    commit("editArea", areaToSave);
    return { ok: true, message: data.msg };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const deleteArea = async ({ commit }, idArea) => {
  try {
    const { data } = await api.delete(`/areas/${idArea}`);

    commit("deleteArea", idArea);
    return { ok: true };
  } catch (error) {
    c;
    return { ok: false, message: error.response.data.error.message };
  }
};

export const createCriterion = async ({ commit }, criterion) => {
  try {
    const { data } = await api.post(
      `/criterions/${criterion.idObjective}`,
      criterion
    );
    data.idObjective = criterion.idObjective;

    commit("createCriterion", data);
    return { ok: true };
  } catch (error) {
    console.log("xxx");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const createObjective = async ({ commit }, objective) => {
  delete objective.id;
  try {
    const { data } = await api.post(
      `/objectives/${objective.idArea}`,
      objective
    );
    console.log(data);
    //data.idObjective = criterion.idObjective;

    commit("createObjective", data);
    return { ok: true };
  } catch (error) {
    console.log("xxx");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const deleteObjective = async ({ commit }, idObjective) => {
  try {
    const { data } = await api.delete(`/objectives/${idObjective}`);
    console.log(data);

    commit("deleteObjective", idObjective);
    return { ok: true };
  } catch (error) {
    console.log("xxx");
    return { ok: false, message: error.response.data.error.message };
  }
};

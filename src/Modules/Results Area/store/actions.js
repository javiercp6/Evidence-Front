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

  const areaToSave = { _id: id, ...area };
  try {
    console.log(objectives.value);
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
  delete criterion.id;
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

export const editCriterion = async ({ commit }, criterion) => {
  const criterionTo = { id: null, name: null, todo: null };
  criterionTo.id = criterion.id;
  criterionTo.name = criterion.name;
  criterionTo.todo = criterion.todo;
  try {
    const { data } = await api.put(`/criterions/${criterion.id}`, criterion);
    console.log(data);
    commit("editCriterion", criterionTo);
    return { ok: true, message: data.msg };
  } catch (error) {
    console.log("xxx");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const deleteCriterion = async ({ commit }, criterion) => {
  const idCriterion = criterion.id;
  //idCriterion = criterion.id;
  try {
    const { data } = await api.delete(
      `/criterions/${criterion.id}/objective/${criterion.idObjective}`
    );
    data.idObjective = criterion.idObjective;
    console.log(data);
    //TODO: Hacer el commit
    commit("deleteCriterion", idCriterion);
    return { ok: true, message: data.msg };
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

export const editObjective = async ({ commit }, objective) => {
  delete objective.idArea;
  delete objective.criterions;
  const objAct = new Object();
  objAct.id = objective.id;
  objAct.name = objective.name;
  try {
    const { data } = await api.put(`/objectives/${objective.id}`, objective);
    console.log(data);

    commit("editObjective", objAct);
    return { ok: true, message: data.msg };
  } catch (error) {
    console.log("xxx");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const deleteObjective = async ({ commit }, objective) => {
  try {
    const { data } = await api.delete(
      `/objectives/${objective.id}/area/${objective.idArea}`
    );
    console.log(data);

    commit("deleteObjective", objective.id);
    return { ok: true };
  } catch (error) {
    console.log("xxx");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const getIndicatorsModel = async ({ commit }) => {
  try {
    const { data } = await api.get("/indicators/category");
    console.log(data);
    commit("getIndicatorsModel", data);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const estabilishIndicator = async ({ commit }, indicatorsModelTo) => {
  const { idsIndicator, idUser } = indicatorsModelTo;
  const inds = { indicators: null };
  inds.indicators = idsIndicator;
  console.log(inds);
  try {
    const { data } = await api.post(`/indicators/${idUser}`, inds);
    console.log(data);
    //commit("indicator/getIndicatorsByUser", data);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const createIndicator = async ({ commit }, indicator) => {
  delete indicator.id;
  try {
    const { data } = await api.post(
      `/indicators/criterion/${indicator.idCriterion}`,
      indicator
    );
    console.log(data);
    console.log("Indicado r creatdo");
    commit("createIndicator", data);
    return { ok: true };
  } catch (error) {
    console.log("mmmm");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const editIndicator = async ({ commit }, indicator) => {
  const indicatorTo = { id: null, name: null, category: null };
  indicatorTo.id = indicator.id;
  indicatorTo.name = indicator.name;
  indicatorTo.category = indicator.category;
  delete indicator.idCriterion;

  //TODO: No se edita la categoria , no se x q

  try {
    const { data } = await api.put(`/indicators/${indicator.id}`, indicator);
    console.log(data);
    commit("editIndicator", indicatorTo);
    return { ok: true, message: data.msg };
  } catch (error) {
    console.log("mmmm");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const deleteIndicator = async ({ commit }, indicator) => {
  try {
    const { data } = await api.delete(`/indicators/${indicator.id}`);
    console.log(data, "dtata");
    commit("deleteIndicator", data);
    return { ok: true, message: data.msg };
  } catch (error) {
    console.log("mmmm");
    return { ok: false, message: error.response.data.error.message };
  }
};

/* export const getUsers = async ({ commit }) => {
  try {
    const { data } = await api.get("/users");
    console.log(data);
    commit("getUsers", data.users);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
}; */

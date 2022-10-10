import { api } from "boot/axios";
// export const myAction = async ({ commit }) => {

// }
export const getArea = async ({ commit }) => {
  try {
    const { data } = await api.get("/areas");
    commit("getArea", data);

    return { ok: true };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const getAreaById = async ({ commit }, idArea) => {
  try {
    const { data } = await api.get(`/areas/${idArea}`);
    commit("getAreaById", data);

    return { ok: true };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const createArea = async ({ commit }, area) => {
  delete area.id;
  const ff = { objectives: area.objectives, name: area.name };
  try {
    const { data } = await api.post("/areas", area);
    commit("createArea", data);
    return { ok: true };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const editArea = async ({ commit }, area) => {
  //const { id, name, objectives } = area;

  const areaToSave = { _id: area.id, name: area.name };
  try {
    const { data } = await api.put(`/areas/${area.id}`, areaToSave);
    commit("editArea", data);
    return { ok: true, message: data.msg };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const deleteArea = async ({ commit }, idArea) => {
  try {
    const { data } = await api.delete(`/areas/${idArea}`);

    commit("deleteArea", idArea);
    return { ok: true };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
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
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const editCriterion = async ({ commit }, criterion) => {
  const criterionTo = { id: null, name: null, todo: null };
  criterionTo.id = criterion.id;
  criterionTo.name = criterion.name;
  criterionTo.todo = criterion.todo;
  try {
    const { data } = await api.put(`/criterions/${criterion.id}`, criterion);
    commit("editCriterion", criterionTo);
    return { ok: true, message: data.msg };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
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
    //TODO: Hacer el commit
    commit("deleteCriterion", idCriterion);
    return { ok: true, message: data.msg };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const createObjective = async ({ commit }, objective) => {
  delete objective.id;
  try {
    const { data } = await api.post(
      `/objectives/${objective.idArea}`,
      objective
    );

    commit("createObjective", data);
    return { ok: true };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
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

    commit("editObjective", objAct);
    return { ok: true, message: data.msg };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const deleteObjective = async ({ commit }, objective) => {
  try {
    const { data } = await api.delete(
      `/objectives/${objective.id}/area/${objective.idArea}`
    );

    commit("deleteObjective", objective.id);
    return { ok: true };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const getIndicatorsModel = async ({ commit }) => {
  try {
    const { data } = await api.get("/indicators/category");
    commit("getIndicatorsModel", data);

    return { ok: true };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const createIndicator = async ({ commit }, indicator) => {
  delete indicator.id;
  try {
    const { data } = await api.post(
      `/indicators/criterion/${indicator.idCriterion}`,
      indicator
    );
    commit("createIndicator", data);
    return { ok: true };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
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
    commit("editIndicator", indicatorTo);
    return { ok: true, message: data.msg };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

export const deleteIndicator = async ({ commit }, indicator) => {
  try {
    const { data } = await api.delete(`/indicators/${indicator.id}`);
    commit("deleteIndicator", data);
    return { ok: true, message: data.msg };
  } catch (error) {
    if (error.response.data.error) {
      return { ok: false, message: error.response.data.error.msg };
    } else if (error.response.data.errors) {
      return { ok: false, message: error.response.data.errors[0].msg };
    } else if (error.response.data.msg) {
      return { ok: false, message: error.response.data.msg };
    } else {
      return { ok: false, message: "Error inesperado" };
    }
  }
};

/* export const getUsers = async ({ commit }) => {
  try {
    const { data } = await api.get("/users");
    commit("getUsers", data.users);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
}; */

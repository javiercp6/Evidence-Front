import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
// export const myAction = async ({ commit }) => {

// }

export const getIndicatorsByUser = async ({ commit }, idUser) => {
  try {
    const { data } = await api.get(`/indicators/user/${idUser}`);
    console.log(data);
    commit("getIndicatorsByUser", data);

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

export const getIndicatorById = async ({ commit }, idIndicator) => {
  try {
    const { data } = await api.get(`/indicators/${idIndicator}`);

    commit("getIndicatorById", data);

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

export const denyIndicator = async ({ commit }, idIndicator) => {
  try {
    const { data } = await api.put(`/indicators/${idIndicator}`, {
      status: false,
    });
    commit("denyIndicator");

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

export const createevidence = async ({ commit }, evidence) => {
  delete evidence.id;
  try {
    const { data } = await api.post(
      `/evidences/${evidence.idIndicator}`,
      evidence
    );

    if (evidence.files) {
      const file = new FormData();
      file.append("file", evidence.files[0]);

      const datafile = await api.put(`/evidences/upload/${data._id}`, file);

      commit("createevidence", datafile.data);
    } else {
      commit("createevidence", data);
    }

    return { ok: true };
  } catch (error) {
    return { ok: false /* , message: error.response.data.msg */ };
  }
};

export const editevidence = async ({ commit }, evidence) => {
  try {
    const { data } = await api.put(`/evidences/${evidence.id}`, evidence);

    if (evidence.files) {
      const file = new FormData();
      file.append("file", evidence.files[0]);

      const datafile = await api.put(`/evidences/upload/${data._id}`, file);

      commit("editevidence", datafile.data);
    } else {
      commit("editevidence", data);
    }

    return { ok: true };
  } catch (error) {
    console.log("erroe");
    return { ok: false /* , message: error.response.data.msg */ };
  }
};

export const deleteevidence = async ({ commit }, evidence) => {
  try {
    const { data } = await api.delete(
      `/evidences/${evidence.id}/indicator/${evidence.idIndicator}`
    );
    console.log(data);
    commit("deleteevidence", data);
    return { ok: true };
  } catch (error) {
    console.log("erroe");
    return { ok: false /* , message: error.response.data.msg */ };
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
    commit("estabilishIndicator", data);

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

export const deleteIndicatorFromUser = async ({ commit }, indicator) => {
  try {
    const { data } = await api.delete(
      `/indicators/${indicator.idIndicator}/user/${indicator.idUser}`
    );

    commit("deleteIndicatorFromUser", data);

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

export const getEvaluationByUser = async ({ commit }, idUser) => {
  try {
    const { data } = await api.get(`/users/evaluation/${idUser}`);
    console.log(data);
    commit("getEvaluationByUser", data);

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

export const createIndicatorsPersonal = async ({ commit }, indicator) => {
  const { indicatorPersonal, idUser } = indicator;
  delete indicatorPersonal.id;

  try {
    const { data } = await api.post(
      `/indicators/personal/${idUser}`,
      indicatorPersonal
    );
    console.log(data);
    commit("createIndicatorsPersonal", data);

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

export const createObservation = async ({ commit }, observation) => {
  try {
    const { data } = await api.put(
      `/indicators/${observation._id}`,
      observation
    );
    console.log(data);
    commit("createObservation", data.observation);

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

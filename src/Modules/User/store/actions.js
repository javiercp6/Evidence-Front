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
    return { ok: false, message: error.response.data.msg };
  }
};

export const getIndicatorById = async ({ commit }, idIndicator) => {
  try {
    const { data } = await api.get(`/indicators/${idIndicator}`);
    //const dataFile = await api.get(`/evidences/file/${idIndicator}`);
    /* const router = useRouter();
    router.push(data); */
    commit("getIndicatorById", data);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const createevidence = async ({ commit }, evidence) => {
  console.log("tttt");
  try {
    const { data } = await api.post(
      `/evidences/${evidence.idIndicator}`,
      evidence
    );

    const file = new FormData();
    file.append("file", evidence.files[0]);
    console.log(file);
    const datafile = await api.put(`/evidences/upload/${data._id}`, file);
    console.log({ datafile }, "FormData");
    console.log({ data }, "dATA");

    commit("createevidence", datafile.data);

    return { ok: true };
  } catch (error) {
    console.log("erroe");
    return { ok: false /* , message: error.response.data.msg */ };
  }
};

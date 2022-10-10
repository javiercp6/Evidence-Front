import { api } from "boot/axios";

// export const myAction = async ({ commit }) => {

// }

export const getUsers = async ({ commit }) => {
  try {
    const { data } = await api.get("/users");
    commit("getUsers", data.users);
    //commit("getUsers", data);

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

export const createUser = async ({ commit }, user) => {
  delete user.id;
  try {
    const { data } = await api.post("/users", user);
    commit("createUser", data);
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

export const editUser = async ({ commit }, user) => {
  try {
    const { data } = await api.put(`/users/${user.id}`, user);
    commit("editUser", data);
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

export const deleteUser = async ({ commit }, idUser) => {
  try {
    const { data } = await api.delete(`/users/${idUser}`);

    commit("deleteUser", data.id);
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

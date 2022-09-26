import { api } from "boot/axios";

// export const myAction = async ({ commit }) => {

// }

export const getUsers = async ({ commit }) => {
  try {
    const { data } = await api.get("/users");
    console.log(data);
    commit("getUsers", data.users);
    //commit("getUsers", data);

    return { ok: true };
  } catch (error) {
    console.log(error, "Error");
    return { ok: false, message: error.response.data.msg };
  }
};

export const createUser = async ({ commit }, user) => {
  delete user.id;
  user.password = "1234";
  try {
    const { data } = await api.post("/users", user);
    console.log(user);
    console.log(data);
    commit("createUser", data);
    return { ok: true };
  } catch (error) {
    console.log("mmmm");
    return { ok: false, message: error.response.data.error.message };
  }
};

export const editUser = async ({ commit }, user) => {
  try {
    const { data } = await api.put(`/users/${user.id}`, user);
    console.log(user);
    console.log(data);
    commit("editUser", data);
    return { ok: true };
  } catch (error) {
    console.log("mmmm", error.response.data);

    return {
      ok: false,
      message: error.response.data.errors[0].msg || "Error inesperado",
    };
  }
};

export const deleteUser = async ({ commit }, idUser) => {
  try {
    const { data } = await api.delete(`/users/${idUser}`);

    console.log(data);
    commit("deleteUser", data.id);
    return { ok: true };
  } catch (error) {
    console.log("mmmm");

    return { ok: false, message: error.response.data.error.message };
  }
};

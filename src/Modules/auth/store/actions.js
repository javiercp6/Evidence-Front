import { api } from "boot/axios";

// export const myAction = async ({ commit }) => {

// }

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken } = data;

    await authApi.post(":update", { displayName: name, idToken, refreshToken });

    delete user.password;
    commit("loginUser", { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInUser = async ({ commit }, user) => {
  try {
    const { data } = await api.post("/login", user);

    //const { displayName, idToken, refreshToken } = data;

    //user.name = displayName;

    commit("loginUser", data);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const checkAuthentication = async ({ commit }) => {
  const idToken = localStorage.getItem("idToken");

  if (!idToken) {
    commit("logout");
    return { ok: false, message: "No hay token" };
  }

  commit("loginUser", idToken);
  return { ok: true };
};

export const changePassword = async ({ commit }, passwords) => {
  try {
    const { data } = await api.put("/users/change/password", passwords);
    //commit("loginUser", data);

    return { ok: true, message: data.msg };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

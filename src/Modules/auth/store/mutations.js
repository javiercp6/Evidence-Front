import jwt_decode from "jwt-decode";
import { api } from "boot/axios";
// export const myAction = ( state ) => {

// }

export const loginUser = (state, idToken) => {
  if (idToken) {
    localStorage.setItem("idToken", idToken);
    api.defaults.headers.common["Authorization"] = idToken;
    state.idToken = idToken;
  }

  const decoded = jwt_decode(idToken);

  const { role, name, uid, username } = decoded;
  state.user = username;
  state.name = name;
  state.role = role;
  state.uid = uid;
  state.status = "authenticated";
};

export const logout = (state) => {
  state.user = null;
  state.idToken = null;
  state.name = null;
  state.role = null;
  state.uid = null;
  state.status = "not-authenticated";

  localStorage.removeItem("idToken");
};

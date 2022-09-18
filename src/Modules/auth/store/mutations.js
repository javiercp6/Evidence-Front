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

  console.log(decoded);
  const { role, name, uid } = decoded;
  state.user = name;
  state.role = role;
  state.uid = uid;
  state.status = "authenticated";
};

export const logout = (state) => {
  state.user = null;
  state.idToken = null;
  state.role = null;
  state.uid = null;
  state.status = "not-authenticated";

  localStorage.removeItem("idToken");
};

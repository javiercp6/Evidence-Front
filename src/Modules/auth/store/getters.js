// export const myGetter = ( state ) => {
//  return state
// }

export const currentState = (state) => {
  return state.status;
};

export const username = (state) => {
  return state.user || "";
};

export const uid = (state) => {
  return state.uid || "";
};

export const role = (state) => {
  return state.role || "";
};

// export const myGetter = ( state ) => {
//  return state
// }

export const areas = (state) => {
  return state.areas;
};

export const area = (state) => {
  /* const area = state.areas.find((area) => area._id === id);
  if (!area) return console.log("ff");
  console.log("fff");
  return { ...area }; */
  return state.area;
};

export const indicatorsModel = (state) => {
  return state.indicatorsModel;
};

export const users = (state) => {
  return state.users;
};

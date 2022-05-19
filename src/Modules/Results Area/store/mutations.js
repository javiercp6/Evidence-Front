// export const myAction = ( state ) => {

// }

export const getArea = (state, areas) => {
  state.areas = areas;
};

export const createArea = (state, areas) => {
  state.areas.add(areas);
};

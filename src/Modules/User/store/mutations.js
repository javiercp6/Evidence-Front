import jwt_decode from "jwt-decode";
// export const myAction = ( state ) => {

// }

export const getIndicators = (state, indicators) => {
  state.indicators = indicators;
};

export const getIndicatorById = (state, indicator) => {
  state.indicator = indicator;
};

export const createevidence = (state, evidence) => {
  state.indicator.evidences.push(evidence);
};

export const getFileById = (state, file) => {
  /* const idx = state.indicator.evidences
    .map((e) => e._id)
    .indexOf(file.idEvidencia);
  state.areas[idx] = area;
  state.indicator.evidences[idx].file = file.file; */
  state.file = file;
};

import jwt_decode from "jwt-decode";
// export const myAction = ( state ) => {

// }

export const getIndicatorsByUser = (state, indicators) => {
  state.indicators = indicators;
};

export const getIndicatorById = (state, indicator) => {
  state.indicator = indicator;
};

export const createevidence = (state, evidence) => {
  state.indicator.evidences.push(evidence);
};

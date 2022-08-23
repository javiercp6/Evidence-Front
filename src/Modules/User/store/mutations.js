import jwt_decode from "jwt-decode";
// export const myAction = ( state ) => {

// }

export const getIndicatorsByUser = (state, indicators) => {
  state.indicators = indicators;
};

export const getIndicatorById = (state, indicator) => {
  state.indicator = indicator;
};

export const denyIndicator = (state) => {
  state.indicator.status = false;
};

export const createevidence = (state, evidence) => {
  state.indicator.evidences.push(evidence);
};

export const deleteevidence = (state, evidence) => {
  state.indicator.evidences = state.indicator.evidences.filter(
    (e) => e._id !== evidence.id
  );
};

export const editevidence = (state, evidence) => {
  //state.indicator.evidences.push(evidence);
  console.log(evidence);
  const idx = state.indicator.evidences.map((e) => e._id).indexOf(evidence._id);
  state.indicator.evidences[idx] = evidence;
};

export const estabilishIndicator = (state, indicatorsData) => {
  for (let i = 0; i < state.indicators.indicators.length; i++) {
    if (
      state.indicators.indicators[i].category ===
      "TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO"
    ) {
      for (let index = 0; index < indicatorsData.length; index++) {
        if (
          indicatorsData[index].category ===
          "TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO"
        ) {
          state.indicators.indicators[i].indicators.push(indicatorsData[index]);
          state.indicators.has = true;
        }
      }
    }
    if (
      state.indicators.indicators[i].category === "TRABAJO POLÍTICO-IDEOLÓGICO"
    ) {
      for (let index = 0; index < indicatorsData.length; index++) {
        if (indicatorsData[index].category === "TRABAJO POLÍTICO-IDEOLÓGICO") {
          state.indicators.indicators[i].indicators.push(indicatorsData[index]);
          state.indicators.has = true;
        }
      }
    }
    if (state.indicators.indicators[i].category === "TRABAJO METODOLÓGICO") {
      for (let index = 0; index < indicatorsData.length; index++) {
        if (indicatorsData[index].category === "TRABAJO METODOLÓGICO") {
          state.indicators.indicators[i].indicators.push(indicatorsData[index]);
          state.indicators.has = true;
        }
      }
    }
    if (
      state.indicators.indicators[i].category ===
      "TRABAJO DE INVESTIGACIÓN E INNOVACIÓN"
    ) {
      for (let index = 0; index < indicatorsData.length; index++) {
        if (
          indicatorsData[index].category ===
          "TRABAJO DE INVESTIGACIÓN E INNOVACIÓN"
        ) {
          state.indicators.indicators[i].indicators.push(indicatorsData[index]);
          state.indicators.has = true;
        }
      }
    }
    if (state.indicators.indicators[i].category === "SUPERACIÓN") {
      for (let index = 0; index < indicatorsData.length; index++) {
        if (indicatorsData[index].category === "SUPERACIÓN") {
          state.indicators.indicators[i].indicators.push(indicatorsData[index]);
          state.indicators.has = true;
        }
      }
    }
  }
};

export const getEvaluationByUser = (state, evaluation) => {
  state.evaluation = evaluation;
};

export const createIndicatorsPersonal = (state, indicator) => {
  state.evaluation.indicators.forEach((ind) => {
    if (ind.category === indicator.category) {
      ind.indicators.push(indicator);
    }
  });
};

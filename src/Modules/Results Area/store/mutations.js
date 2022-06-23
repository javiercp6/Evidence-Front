// export const myAction = ( state ) => {

// }

export const getArea = (state, areas) => {
  state.areas = areas;
};

export const getAreaById = (state, area) => {
  state.area = area;
};

export const createArea = (state, areas) => {
  state.areas.push(areas);
};

export const editArea = (state, area) => {
  console.log(area);
  const idx = state.areas.map((a) => a._id).indexOf(area._id);
  state.areas[idx] = area;
};

export const deleteArea = (state, idArea) => {
  state.areas = state.areas.filter((area) => area._id !== idArea);
};

export const createCriterion = (state, criterion) => {
  const idx = state.area.objectives
    .map((o) => o._id)
    .indexOf(criterion.idObjective);
  state.area.objectives[idx].criterions.push(criterion);
};

export const createObjective = (state, objective) => {
  state.area.objectives.push(objective);
};

export const deleteObjective = (state, idObjective) => {
  state.area.objectives = state.area.objectives.filter(
    (o) => o._id !== idObjective
  );
};

export const getIndicatorsModel = (state, indicators) => {
  state.indicatorsModel = indicators;
};
export const createIndicator = (state, data) => {
  const indicator = { name: data.name, _id: data._id };
  state.area.objectives.forEach((element) => {
    element.criterions.forEach((e) => {
      if (e._id === data.criterion._id) {
        e.indicator = indicator;
      }
    });
  });
};

export const getUsers = (state, users) => {
  state.users = users;
};

export const removeIndicatorModel = (state, idIndicator) => {
  state.indicatorsModel.forEach((element) => {
    element.indicators = element.indicators.filter(
      (indicator) => indicator._id !== idIndicator
    );
  });
};

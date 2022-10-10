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
  const idx = state.areas.map((a) => a._id).indexOf(area._id);
  state.areas[idx].name = area.name;
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

export const editCriterion = (state, criterion) => {
  state.area.objectives.forEach((element) => {
    element.criterions.forEach((e) => {
      if (e._id === criterion.id) {
        e.name = criterion.name;
        e.todo = criterion.todo;
      }
    });
  });
};

export const deleteCriterion = (state, idCriterion) => {
  state.area.objectives.forEach((element) => {
    element.criterions = element.criterions.filter(
      (c) => c._id !== idCriterion
    );
    /* element.criterions.forEach((e) => {
      if (e._id === idCriterion) {
        e.name = criterion.name;
        e.todo = criterion.todo;
      }
    }); */
  });
};

export const createObjective = (state, objective) => {
  state.area.objectives.push(objective);
};

export const editObjective = (state, objective) => {
  const idx = state.area.objectives.map((o) => o._id).indexOf(objective.id);
  state.area.objectives[idx].name = objective.name;
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
  const indicator = { name: data.name, _id: data._id, category: data.category };
  state.area.objectives.forEach((element) => {
    element.criterions.forEach((e) => {
      if (e._id === data.criterion._id) {
        e.indicator = indicator;
      }
    });
  });
};

export const editIndicator = (state, indicator) => {
  state.area.objectives.forEach((element) => {
    element.criterions.forEach((e) => {
      if (e.indicator) {
        if (e.indicator._id === indicator.id) {
          e.indicator.name = indicator.name;
          e.indicator.category = indicator.category;
        }
      }
    });
  });
};

export const deleteIndicator = (state, idIndicator) => {
  state.area.objectives.forEach((element) => {
    element.criterions.forEach((e) => {
      if (e.indicator && e.indicator._id === idIndicator.id) {
        delete e.indicator;
      }
    });
  });
};

/* export const getUsers = (state, users) => {
  state.users = users;
}; */

export const removeIndicatorModel = (state, idIndicator) => {
  state.indicatorsModel.forEach((element) => {
    element.indicators = element.indicators.filter(
      (indicator) => indicator._id !== idIndicator
    );
  });
};

export const getUsersByString = (state, term) => {
  if (term.length === 0) state.users;
  else
    state.users = state.users.filter((entry) =>
      entry.name.toLowerCase().includes(term.toLocaleLowerCase())
    );
  //state.users = users;
};

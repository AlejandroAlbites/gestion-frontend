const initialState = {
  projects: [],
  currentProject: null,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'GET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    case 'GET_PROJECT_ID':
      return {
        ...state,
        currentProject: action.payload,
      };
    case 'CLEAR_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: null,
      };
    // case 'CREATE_GROUP':
    //   const newGroup = [action.payload];
    //   let group = {};
    //   newGroup.forEach((item) => {
    //     group[item._id] = {
    //       id: item._id,
    //       title: item.name,
    //       techIds: item.techniciansId,
    //     };
    //   });
    //   console.log(group);
    //   console.log(state.currentProject);
    //   // const groups = Object.assign(state.currentProject.groups, group);

    //   return {
    //     ...state,
    //     currentProject: {
    //       ...state.currentProject,
    //       groups: { ...state.currentProject.groups, ...group },
    //     },
    //   };

    default:
      return state;
  }
};

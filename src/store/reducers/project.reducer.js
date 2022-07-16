const initialState = {
  newProject: null,
  projects: null,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return {
        ...state,
        newProject: action.payload,
      };
    case 'GET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };

    default:
      return state;
  }
};

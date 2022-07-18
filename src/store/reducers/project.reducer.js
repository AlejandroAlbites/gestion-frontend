const initialState = {
  newProject: null,
  projects: null,
  currentProject: null,
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

    default:
      return state;
  }
};

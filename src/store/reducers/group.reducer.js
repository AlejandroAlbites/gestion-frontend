const initialState = {
  // firstGroup: null,
  groups: null,
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'CREATE_FIRST_GROUP':
    //   return {
    //     ...state,
    //     firstGroup: action.payload,
    //   };

    case 'GET_GROUPS':
      return {
        ...state,
        groups: action.payload,
      };

    default:
      return state;
  }
};

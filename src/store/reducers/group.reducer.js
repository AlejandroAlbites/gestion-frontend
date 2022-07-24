const initialState = {
  groups: null,
  allGroups: [],
  isLoadingGroup: false,
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GROUPS':
      return {
        ...state,
        groups: action.payload,
      };
    case 'GET_ALL_GROUPS':
      return {
        ...state,
        allGroups: action.payload,
      };
    case 'UPDATE_SCORE_GROUP':
      const groups = state.groups.map((group) =>
        group._id === action.payload._id ? action.payload : group
      );
      return {
        ...state,
        groups,
      };
    case 'UPDATE_STATE_GROUP':
      const updateScoreGroup = state.groups.map((group) =>
        group._id === action.payload._id ? action.payload : group
      );
      return {
        ...state,
        groups: updateScoreGroup,
      };
    case 'DRAG_TECHNICIAN':
      const newTechnicianInGroup = state.groups.map((group) =>
        group._id === action.payload.finishGroupUpdate._id
          ? action.payload.finishGroupUpdate
          : group._id === action.payload.startGroupUpdate_id
          ? action.payload.startGroupUpdate_id
          : group
      );
      return {
        ...state,
        groups: newTechnicianInGroup,
      };
    case 'DRAG_TECHNICIAN_INITIAL_POSITION':
      const newGroupOutTechnician = state.groups.map((group) =>
        group._id === action.payload.startGroupUpdate._id
          ? action.payload.startGroupUpdate
          : group
      );
      return {
        ...state,
        groups: newGroupOutTechnician,
      };
    case 'DRAG_TECHNICIAN_INTO_GROUP':
      const updateOrderIntoGroup = state.groups.map((group) =>
        group._id === action.payload._id ? action.payload : group
      );
      return {
        ...state,
        groups: updateOrderIntoGroup,
      };
    case 'LOADING_GROUP':
      return {
        ...state,
        isLoadingGroup: action.payload,
      };

    default:
      return state;
  }
};

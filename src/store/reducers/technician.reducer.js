const initialState = {
  newTechnician: null,
  technicians: null,
};

export const technicianReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TECHNICIAN':
      return {
        ...state,
        newTechnician: action.payload,
      };
    case 'GET_TECHNICIANS':
      return {
        ...state,
        technicians: action.payload,
      };

    default:
      return state;
  }
};

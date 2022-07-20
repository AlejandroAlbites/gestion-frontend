const initialState = {
  newTechnician: null,
  technicians: [],
};

export const technicianReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TECHNICIAN':
      return {
        ...state,
        technicians: [...state.technicians, action.payload],
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

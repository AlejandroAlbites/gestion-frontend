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
    case 'IMAGE_TECHNICIAN':
      return {
        ...state,
        technicianImage: action.payload,
      };
    case 'CLEAR_CURRENT_IMAGE':
      return {
        ...state,
        technicianImage: null,
      };
    case 'UPDATE_TECHNICIAN':
      const technicians = state.technicians.map((technician) =>
        technician._id === action.payload._id ? action.payload : technician
      );
      return {
        ...state,
        technicians,
      };
    default:
      return state;
  }
};

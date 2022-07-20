const initialState = {
  id: null,
  checking: false,
  isLogin: false,
  name: null,
  email: null,
  company: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_REVALIDATE':
      return {
        ...state,
        checking: action.payload,
      };
    case 'LOGIN_USER':
      return {
        ...state,
        checking: false,
        isLogin: true,
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
      };
    case 'REGISTER_USER':
      return {
        ...state,
        checking: false,
        isLogin: true,
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
      };

    case 'FINISH_CHECKING':
      return {
        ...state,
        checking: false,
      };

    case 'LOGOUT_USER':
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  id: null,
  checking: true,
  isLogin: false,
  name: null,
  email: null,
  company: null,
  isLoginEdit: false,
  changePassword: null,
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
    case 'GET_USER_ID':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_IMAGE':
      return {
        ...state,
        imageProfile: action.payload,
      };
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_USER':
      return initialState;

    case 'LOADING_EDIT':
      return {
        ...state,
        isLoginEdit: action.payload,
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        changePassword: action.payload,
      };
    default:
      return state;
  }
};

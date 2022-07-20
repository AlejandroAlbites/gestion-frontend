import axios from 'axios';
import jwt_decode from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_URL_BACKEND;

export function loginUserAction(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.ok) {
        localStorage.setItem('token', response.data.token);
      }

      dispatch(loginUser(response.data.user));
    } catch (error) {
      console.log(error);
      //   toast.error('the email or password is not correct', {
      //     position: 'top-center',
      //     theme: 'colored',
      //   });
    }
  };
}

const loginUser = (login) => ({
  type: 'LOGIN_USER',
  payload: login,
});

export function registerUserAction(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        {
          name: data.name,
          company: data.company,
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.ok) {
        localStorage.setItem('token', response.data.token);
      }

      dispatch(registerUser(response.data.user));
    } catch (error) {
      console.log(error);
      //   toast.error('Error - There is already a user with that email', {
      //     position: 'top-center',
      //     theme: 'colored',
      //   });
    }
  };
}

const registerUser = (register) => ({
  type: 'REGISTER_USER',
  payload: register,
});

export const startChecking = () => {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_REVALIDATE', payload: true });
    try {
      const token = localStorage.getItem('token') || '';

      const response = await axios.get(`${BASE_URL}/auth/renew`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.ok) {
        const tokenDecode = jwt_decode(response.data.token);
        dispatch(
          loginUser({
            _id: tokenDecode._id,
          })
        );
        localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(finishChecking());
    dispatch({ type: 'LOADING_REVALIDATE', payload: false });
  };
};

const finishChecking = () => ({
  type: 'FINISH_CHECKING',
});

export function getUsersIdAction() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.get(`${BASE_URL}/auth/user`, {
        headers: {
          'Content-Type': 'text/plain',
          authorization: `Bearer ${token}`,
        },

      });
      dispatch(getUsersId(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

const getUsersId = (user) => ({
  type: 'GET_USER_ID',
  payload: user,
});

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  };
};

const logout = () => ({
  type: 'LOGOUT_USER',
});

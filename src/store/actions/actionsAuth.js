import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { uplodadImageProfile } from '../../helpers/CloudinaryImages';
const BASE_URL = process.env.REACT_APP_URL_BACKEND;

export function loginUserAction(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.data.ok) {
        localStorage.setItem('token', response.data.token);
      }

      dispatch(loginUser(response.data.user));
    } catch (error) {
      if (error.response.data.ok === false) {
        toast.error('El correo o la contraseña no son correctos', {
          position: 'top-center',
          theme: 'colored',
        });
      }
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
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name: data.name,
        company: data.company,
        email: data.email,
        password: data.password,
      });

      if (response.data.ok) {
        localStorage.setItem('token', response.data.token);
      }

      dispatch(registerUser(response.data.user));
    } catch (error) {
      console.log(error);
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

export function updateUserProfileAction(data) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_EDIT', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(`${BASE_URL}/auth/edit`, data, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response.data.ok) {
        dispatch(updateUserProfile(response.data.data));
      }
    } catch (error) {
      console.log(error);
      throw new Error('error');
    }
    dispatch({ type: 'LOADING_EDIT', payload: false });
  };
}

const updateUserProfile = (userUpdated) => ({
  type: 'UPDATE_USER_PROFILE',
  payload: userUpdated,
});

export function updateImageAction(file) {
  return async (dispatch) => {
    const fileUrl = await uplodadImageProfile(file);
    dispatch(updateImage(fileUrl));
  };
}

const updateImage = (fileUrl) => ({
  type: 'UPDATE_IMAGE',
  payload: fileUrl,
});

export const changePasswordAction = (data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(
        `${BASE_URL}/auth/change-password`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      dispatch(changePassword(response.data.ok));
    } catch (error) {
      console.log(error);
    }
  };
};

const changePassword = (ok) => ({
  type: 'CHANGE_PASSWORD',
  payload: ok,
});

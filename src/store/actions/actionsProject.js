import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL_BACKEND;

export function createProjectAction(data) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_PROJECT', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.post(
        `${BASE_URL}/api/project`,
        {
          name: data.name,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(createProject(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_PROJECT', payload: false });
  };
}
const createProject = (data) => ({
  type: 'CREATE_PROJECT',
  payload: data,
});

export function getProjectsAction() {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_PROJECT', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.get(`${BASE_URL}/api/project`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch(getProjects(response.data.projects));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_PROJECT', payload: false });
  };
}
const getProjects = (data) => ({
  type: 'GET_PROJECTS',
  payload: data,
});

export function getProjectIdAction(id) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_PROJECT', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.get(
        `${BASE_URL}/api/project/getProject/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getProjectId(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_PROJECT', payload: false });
  };
}

const getProjectId = (data) => ({
  type: 'GET_PROJECT_ID',
  payload: data,
});

export const clearCurrentProject = () => ({
  type: 'CLEAR_CURRENT_PROJECT',
});

export function destroyProjectAction(id) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_PROJECT', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.delete(`${BASE_URL}/api/project/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch(destroyProject(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_PROJECT', payload: false });
  };
}
const destroyProject = (data) => ({
  type: 'DESTROY_PROJECT',
  payload: data,
});

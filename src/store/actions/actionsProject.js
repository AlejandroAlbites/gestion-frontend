import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL_BACKEND;

export function createProjectAction(data) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.post(
        `http://localhost:8080/api/project`,
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

      //   console.log(response.data.data);

      dispatch(createProject(response.data.data));
    } catch (error) {
      console.log(error);
      //   toast.error('the email or password is not correct', {
      //     position: 'top-center',
      //     theme: 'colored',
      //   });
    }
  };
}
const createProject = (data) => ({
  type: 'CREATE_PROJECT',
  payload: data,
});

export function getProjectsAction() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.get(`http://localhost:8080/api/project`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      //   console.log(response.data.projects);

      dispatch(getProjects(response.data.projects));
    } catch (error) {
      console.log(error);
      //   toast.error('the email or password is not correct', {
      //     position: 'top-center',
      //     theme: 'colored',
      //   });
    }
  };
}
const getProjects = (data) => ({
  type: 'GET_PROJECTS',
  payload: data,
});

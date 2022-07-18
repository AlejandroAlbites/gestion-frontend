import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL_BACKEND;

export function createFirstGroupAction(data) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.post(
        `http://localhost:8080/api/project/group`,
        {
          name: data.name,
          description: data.description,
          projectId: data.id,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(firstGroup(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

const firstGroup = (data) => ({
  type: 'CREATE_FIRST_GROUP',
  payload: data,
});

export function getGroupssAction(id) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.get(
        `http://localhost:8080/api/project/groups/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getGroups(response.data.groups));
    } catch (error) {
      console.log(error);
    }
  };
}
const getGroups = (data) => ({
  type: 'GET_GROUPS',
  payload: data,
});

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL_BACKEND;

export function createTechnicianAction(data) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.post(
        `http://localhost:8080/api/technician`,
        {
          name: data.name,
          lastName: data.lastName,
          role: data.role,
          dni: data.dni,
          statistics: data.statistics,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.data);
      dispatch(newTechnician(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

const newTechnician = (data) => ({
  type: 'CREATE_TECHNICIAN',
  payload: data,
});

export function getTechniciansAction() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.get(`http://localhost:8080/api/technician`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch(getTechnicians(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
}
const getTechnicians = (data) => ({
  type: 'GET_TECHNICIANS',
  payload: data,
});

export function addOrRemoveTechInProject(techId, groupId) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(
        `${BASE_URL}/api/project/addTechnician/${groupId}/${techId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      // if (response.data.ok) {
      // dispatch(
      //   giveOrRemoveLike({
      //     messageId: MessageId,
      //     likes: response.data.like.likes,
      //   })
      // );
      // }
    } catch (error) {
      console.log(error);
    }
  };
}
// const giveOrRemoveLike = (payload) => ({
//   type: 'GIVE_OR_REMOVE_LIKE',
//   payload: payload,
// });

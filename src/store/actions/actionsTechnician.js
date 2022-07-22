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
        `${BASE_URL}/api/technician`,
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
      const response = await axios.get(`${BASE_URL}/api/technician`, {
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
    } catch (error) {
      console.log(error);
    }
  };
}

export function dragTechnicianInGroups(startGroupId, finishGroupId, techId) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(
        `${BASE_URL}/api/project/group/${startGroupId}/${finishGroupId}/${techId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(dragTechnician(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}
const dragTechnician = (data) => ({
  type: 'DRAG_TECHNICIAN',
  payload: data,
});
export function updateOrderTechnicianInGroup(
  groupId,
  technicianId,
  startIndex,
  finishIndex
) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(
        `${BASE_URL}/api/project/dragTechnician/${groupId}/${technicianId}/${startIndex}/${finishIndex}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(dragTechnicianIntoGroup(response.data.groupUpdate));
    } catch (error) {
      console.log(error);
    }
  };
}
const dragTechnicianIntoGroup = (data) => ({
  type: 'DRAG_TECHNICIAN_INTO_GROUP',
  payload: data,
});

import axios from 'axios';
import { uplodadImageProfile } from '../../helpers/CloudinaryImages';

const BASE_URL = process.env.REACT_APP_URL_BACKEND;

export function createTechnicianAction(data) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_TECH', payload: true });
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
          image: data.technicianImage,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(newTechnician(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_TECH', payload: false });
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
    dispatch({ type: 'LOADING_ADD_TECH', payload: true });
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
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_ADD_TECH', payload: false });
  };
}

export function dragTechnicianInGroups(startGroupId, finishGroupId, techId) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_TECH', payload: true });
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
      dispatch(dragTechnicianStart(response.data));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_TECH', payload: false });
  };
}

const dragTechnician = (data) => ({
  type: 'DRAG_TECHNICIAN',
  payload: data,
});
const dragTechnicianStart = (data) => ({
  type: 'DRAG_TECHNICIAN_INITIAL_POSITION',
  payload: data,
});

export function updateOrderTechnicianInGroup(
  groupId,
  technicianId,
  startIndex,
  finishIndex
) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_TECH', payload: true });
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
    dispatch({ type: 'LOADING_TECH', payload: false });
  };
}

const dragTechnicianIntoGroup = (data) => ({
  type: 'DRAG_TECHNICIAN_INTO_GROUP',
  payload: data,
});

export function newImagenTechnician(file) {
  return async (dispatch) => {
    const fileUrl = await uplodadImageProfile(file);
    dispatch(updateImage(fileUrl));
  };
}

const updateImage = (fileUrl) => ({
  type: 'IMAGE_TECHNICIAN',
  payload: fileUrl,
});

export const clearCurrentImage = () => ({
  type: 'CLEAR_CURRENT_IMAGE',
});

export function updateTechnicianAction(data, id) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_TECH', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(
        `${BASE_URL}/api/technician/${id}`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      if (response.data.ok) {
        dispatch(updateTechnician(response.data.data));
      }
    } catch (error) {
      console.log(error);
      throw new Error('error');
    }
    dispatch({ type: 'LOADING_TECH', payload: false });
  };
}

const updateTechnician = (technicianUpdated) => ({
  type: 'UPDATE_TECHNICIAN',
  payload: technicianUpdated,
});

export function destroyTechnicianAction(id) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_TECH', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.delete(`${BASE_URL}/api/technician/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch(destroyTechnician(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_TECH', payload: false });
  };
}
const destroyTechnician = (data) => ({
  type: 'DESTROY_TECHNICIAN',
  payload: data,
});

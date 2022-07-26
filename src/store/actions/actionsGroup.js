import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL_BACKEND;

export function createFirstGroupAction(data) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_CREATE_GROUP', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.post(
        `${BASE_URL}/api/project/group`,
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

      if (response.data.ok) {
        dispatch(createGroup(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_CREATE_GROUP', payload: false });
  };
}

const createGroup = (data) => ({
  type: 'CREATE_GROUP',
  payload: data,
});

export function getGroupssAction(id) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.get(`${BASE_URL}/api/project/groups/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

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

export function getAllGroupsAction() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }
      const response = await axios.get(`${BASE_URL}/api/groups`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch(getAllGroups(response.data.AllGroups));
    } catch (error) {
      console.log(error);
    }
  };
}
const getAllGroups = (data) => ({
  type: 'GET_ALL_GROUPS',
  payload: data,
});

export function dragGroupInStatus(startStateId, finishStateId, groupId) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_GROUP', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(
        `${BASE_URL}/api/project/dragGroup/${startStateId}/${finishStateId}/${groupId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateStateGroup(response.data.groupUpdate));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_GROUP', payload: false });
  };
}

const updateStateGroup = (data) => ({
  type: 'UPDATE_STATE_GROUP',
  payload: data,
});

export function updateOrderGroupsInStatus(
  statusId,
  groupId,
  startIndex,
  finishIndex
) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_GROUP', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(
        `${BASE_URL}/api/project/dragGroupInStatus/${statusId}/${groupId}/${startIndex}/${finishIndex}`,
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
    dispatch({ type: 'LOADING_GROUP', payload: false });
  };
}
export function updateGroupScore(groupId, score) {
  return async (dispatch) => {
    dispatch({ type: 'LOADING_GROUP', payload: true });
    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return false;
      }

      const response = await axios.put(
        `${BASE_URL}/api/project/group/${groupId}/${score}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updateScoreGroup(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'LOADING_GROUP', payload: false });
  };
}

const updateScoreGroup = (data) => ({
  type: 'UPDATE_SCORE_GROUP',
  payload: data,
});

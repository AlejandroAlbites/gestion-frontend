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
      console.log(response.data.data);
      dispatch(createGroup(response.data.data));
    } catch (error) {
      console.log(error);
    }
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

export function dragGroupInStatus(startStateId, finishStateId, groupId) {
  return async (dispatch) => {
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

export function updateOrderGroupsInStatus(
  statusId,
  groupId,
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
        `${BASE_URL}/api/project/dragGroupInStatus/${statusId}/${groupId}/${startIndex}/${finishIndex}`,
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

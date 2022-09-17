import toast from 'react-hot-toast'

import {
  ADD_ROOM,
  DELETE_ROOM,
  EDIT_ROOM,
  ROOM_DETAIL,
  ROOM_LIST,
  AVAILABLE_ROOM_LIST,
} from '.'
import { api, APIS } from '../../config'

export function addRoomAction(body: any, goBackHandler: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_ROOM.LOADING })
      res = await api(APIS.room, 'POST', body)
      const { success, data } = res.data

      if (success === true) {
        dispatch({ type: ADD_ROOM.SUCCESS })
        toast.success('Room successfully Added')
        goBackHandler()
      } else {
        dispatch({ type: ADD_ROOM.ERROR })
        toast.error(data.message)
      }
    } catch ({ message }) {
      dispatch({ type: ADD_ROOM.ERROR })
      console.error(message)
      toast.error('Error Adding Room')
      // return 0;
    }
  }
}

export function editRoomAction(id: any, body: any, goBackHandler: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: EDIT_ROOM.LOADING })

      // const removeImagePromise = new Promise(async (resolve, reject) => {
      //   if (imageBody.index?.length === 0) {
      //     return resolve("no remove");
      //   } else {
      //     let photoRes = await api(
      //       `${APIS.room}/image/${id}`,
      //       "DELETE",
      //       imageBody
      //     );
      //     const { success: photoSuccess, data: photoData } = photoRes.data;
      //     if (photoSuccess) {
      //       resolve("success");
      //     } else {
      //       dispatch({ type: EDIT_ROOM.ERROR });
      //       toast.error(photoData.message);
      //       reject();
      //     }
      //   }
      // });

      // removeImagePromise.then(async () => {
      res = await api(`${APIS.room}/${id}`, 'PATCH', body)

      const { success, data } = res.data
      if (success === true) {
        dispatch({ type: EDIT_ROOM.SUCCESS })
        toast.success('Room successfully Edited')
        goBackHandler()
      } else {
        dispatch({ type: EDIT_ROOM.ERROR })
        toast.error(data.message)
      }
      // });
    } catch ({ message }) {
      dispatch({ type: EDIT_ROOM.ERROR })
      console.error(message)
      toast.error('Error Editing Room')
      // return 0;
    }
  }
}

export function addRoomWithImageAction(formdata: any, goBackHandler: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_ROOM.LOADING })
      res = await api(APIS.room, 'POST', formdata, { file: true })
      const { success, data } = res.data

      if (success === true) {
        dispatch({ type: ADD_ROOM.SUCCESS })
        toast.success('Room successfully Added')
        goBackHandler()
      } else {
        dispatch({ type: ADD_ROOM.ERROR })
        toast.error(data.message)
      }
    } catch ({ message }) {
      dispatch({ type: ADD_ROOM.ERROR })
      console.error(message)
      toast.error('Error Adding Room')
      // return 0;
    }
  }
}

export function editRoomWithImageAction(
  id: any,
  formData: any,
  goBackHandler: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: EDIT_ROOM.LOADING })

      // const removeImagePromise = new Promise(async (resolve, reject) => {
      //   if (imageBody.index?.length === 0) {
      //     return resolve("no remove");
      //   } else {
      //     let photoRes = await api(
      //       `${APIS.room}/image/${id}`,
      //       "DELETE",
      //       imageBody
      //     );
      //     const { success: photoSuccess, data: photoData } = photoRes.data;
      //     if (photoSuccess) {
      //       resolve("success");
      //     } else {
      //       dispatch({ type: EDIT_ROOM.ERROR });
      //       toast.error(photoData.message);
      //       reject();
      //     }
      //   }
      // });

      // removeImagePromise.then(async () => {
      res = await api(`${APIS.room}/${id}`, 'PATCH', formData, {
        file: true,
      })

      const { success, data } = res.data
      if (success === true) {
        dispatch({ type: EDIT_ROOM.SUCCESS })
        toast.success('Room successfully Edited')
        goBackHandler()
      } else {
        dispatch({ type: EDIT_ROOM.ERROR })
        toast.error(data.message)
      }
      // });
    } catch ({ message }) {
      dispatch({ type: EDIT_ROOM.ERROR })
      console.error(message)
      toast.error('Error Editing Room')
      // return 0;
    }
  }
}

export function getRoomListAction(page: any = 1) {
  const TABLE_LIMIT = 8
  return async function (dispatch: any) {
    let res
    try {
      if (page === 1) {
        dispatch({ type: ROOM_LIST.CLEAR })
      }
      dispatch({ type: ROOM_LIST.LOADING })
      res = await api(`${APIS.room}?page=${page}&limit=${TABLE_LIMIT}`)
      const {
        success,
        data: {
          data: { rows },
        },
      } = res.data
      if (success === true) {
        dispatch({ type: ROOM_LIST.SUCCESS, payload: rows })
      } else {
        dispatch({ type: ROOM_LIST.ERROR })
      }
    } catch ({ message }) {
      dispatch({ type: ROOM_LIST.ERROR })
      console.error(message)
      // return 0;
    }
  }
}

export function getAvailableRoomListAction(checkin: string, checkout: string) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: AVAILABLE_ROOM_LIST.LOADING })
      res = await api(
        `${APIS.room}/available?checkin=${checkin}&checkout=${checkout}`
      )
      const {
        success,
        data: { data: availableRoomList },
      } = res.data
      if (success === true) {
        dispatch({
          type: AVAILABLE_ROOM_LIST.SUCCESS,
          payload: availableRoomList,
        })
      } else {
        dispatch({ type: AVAILABLE_ROOM_LIST.ERROR })
      }
    } catch ({ message }) {
      dispatch({ type: AVAILABLE_ROOM_LIST.ERROR })
      console.error(message)
      // return 0;
    }
  }
}

export function getRoomDetailAction(id: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ROOM_DETAIL.LOADING })
      res = await api(`${APIS.room}/${id}`)
      const {
        success,
        data: { data },
      } = res.data
      if (success === true) {
        dispatch({ type: ROOM_DETAIL.SUCCESS, payload: data })
      } else {
        dispatch({ type: ROOM_DETAIL.ERROR })
      }
    } catch ({ message }) {
      dispatch({ type: ROOM_DETAIL.ERROR })
      console.error(message)
      //   return 0;
    }
  }
}

export function deleteRoomAction(id: any, callback: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_ROOM.LOADING })
      res = await api(`${APIS.room}/${id}`, 'DELETE')

      const { success, data } = res.data

      if (success === true) {
        dispatch(getRoomListAction(1))
        callback && callback()
        toast.success('Room successfully deleted')
      } else {
        dispatch({ type: DELETE_ROOM.ERROR })
        toast.error(data.message)
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_ROOM.ERROR })
      toast.error('Error Deleting Room')
      console.error(message)
      // return 0;
    }
  }
}

export function activateRoomAction(id: any, callback: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_ROOM.LOADING })
      res = await api(`${APIS.room}/${id}/activate`, 'PATCH')

      const { success, data } = res.data

      if (success === true) {
        dispatch(getRoomListAction(1))
        callback && callback()
        toast.success('Room successfully activated!')
      } else {
        dispatch({ type: DELETE_ROOM.ERROR })
        toast.error(data.message)
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_ROOM.ERROR })
      toast.error('Error activating Room')
      console.error(message)
      // return 0;
    }
  }
}

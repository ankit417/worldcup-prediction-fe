import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { GROUP, ADD_GROUP, EDIT_GROUP, DELETE_GROUP } from '.'

export function getAllGroups(groupId: number) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GROUP.LOADING })
      res = await api(`${APIS.group}/${groupId}`)
      console.log('tournament', res)
      const { success, data } = res.data

      if (success) {
        dispatch({
          type: GROUP.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: GROUP.ERROR })
        toast.error('Error getting tournaments')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GROUP.ERROR })
      toast.error('Error getting tournaments')
      return 0
    }
  }
}

export function addGroups(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_GROUP.LOADING })
      res = await api(`${APIS.group}`, 'POST', body)
      console.log('tournament add group', res)
      const { success, message } = res.data
      console.log('res data add group', message)
      if (success) {
        dispatch({
          type: ADD_GROUP.SUCCESS,
        })
        toast.success('Group created')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_GROUP.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_GROUP.ERROR })
      toast.error('Error Adding Group')
      return 0
    }
  }
}
export function updateGroup(groupId: number, body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: EDIT_GROUP.LOADING })
      res = await api(`${APIS.group}/group/${groupId}`, 'PATCH', body)
      console.log('tournament edit group', res)
      const { success, message } = res.data
      if (success) {
        dispatch({
          type: EDIT_GROUP.SUCCESS,
        })
        toast.success('Group created')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: EDIT_GROUP.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: EDIT_GROUP.ERROR })
      toast.error('Error Editing Group')
      return 0
    }
  }
}

export function deleteGroup(groupId: number, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_GROUP.LOADING })
      res = await api(`${APIS.group}/group/${groupId}`, 'DELETE')
      const { success, message } = res.data
      if (success) {
        dispatch({
          type: DELETE_GROUP.SUCCESS,
        })
        toast.success('Group deleted')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: DELETE_GROUP.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_GROUP.ERROR })
      toast.error('Error Editing Group')
      return 0
    }
  }
}

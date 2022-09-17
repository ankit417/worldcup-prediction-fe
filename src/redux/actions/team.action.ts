import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { TEAM, ADD_TEAM, EDIT_TEAM, DELETE_TEAM } from '.'

export function getAllTeam() {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: TEAM.LOADING })
      res = await api(`${APIS.team}`)
      const { success, data } = res.data

      if (success) {
        dispatch({
          type: TEAM.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: TEAM.ERROR })
        toast.error('Error getting tournaments')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: TEAM.ERROR })
      toast.error('Error getting tournaments')
      return 0
    }
  }
}

export function addTeam(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_TEAM.LOADING })
      res = await api(`${APIS.group}`, 'POST', body)
      console.log('tournament add group', res)
      const { success, message } = res.data
      console.log('res data add group', message)
      if (success) {
        dispatch({
          type: ADD_TEAM.SUCCESS,
        })
        toast.success('Group created')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_TEAM.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_TEAM.ERROR })
      toast.error('Error Adding Group')
      return 0
    }
  }
}
export function updateTeam(groupId: number, body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: EDIT_TEAM.LOADING })
      res = await api(`${APIS.group}/group/${groupId}`, 'PATCH', body)
      console.log('tournament edit group', res)
      const { success, message } = res.data
      if (success) {
        dispatch({
          type: EDIT_TEAM.SUCCESS,
        })
        toast.success('Group created')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: EDIT_TEAM.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: EDIT_TEAM.ERROR })
      toast.error('Error Editing Group')
      return 0
    }
  }
}

export function deleteTeam(groupId: number, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_TEAM.LOADING })
      res = await api(`${APIS.group}/group/${groupId}`, 'DELETE')
      const { success, message } = res.data
      if (success) {
        dispatch({
          type: DELETE_TEAM.SUCCESS,
        })
        toast.success('Group deleted')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: DELETE_TEAM.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_TEAM.ERROR })
      toast.error('Error Editing Group')
      return 0
    }
  }
}

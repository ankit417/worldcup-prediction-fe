import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { TIESHEET, ADD_TIESHEET, DELETE_TIESHEET } from '.'

export function getAllTieSheet(groupId: number) {
  // console.log('tiesheet Called here', groupId)
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: TIESHEET.LOADING })
      res = await api(`${APIS.tiesheet}/${groupId}`)
      // console.log('tiesheet response', res)
      const { success, data } = res.data
      if (success) {
        dispatch({
          type: TIESHEET.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: TIESHEET.ERROR })
        toast.error('Error getting tournaments')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: TIESHEET.ERROR })
      toast.error('Error getting tournaments')
      return 0
    }
  }
}

export function addTieSheet(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_TIESHEET.LOADING })
      res = await api(`${APIS.tiesheet}`, 'POST', body)
      //console.log('create tournament res', res)
      const { success, message } = res.data
      //console.log('res data add group', message)
      if (success) {
        dispatch({
          type: ADD_TIESHEET.SUCCESS,
        })
        toast.success('Tournament created')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_TIESHEET.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_TIESHEET.ERROR })
      toast.error('Error Adding Tournament')
      return 0
    }
  }
}

export function deleteTieSheet(groupId: number, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_TIESHEET.LOADING })
      res = await api(`${APIS.tiesheet}/${groupId}`, 'DELETE')
      const { success, message } = res.data
      if (success) {
        dispatch({
          type: DELETE_TIESHEET.SUCCESS,
        })
        toast.success('Group deleted')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: DELETE_TIESHEET.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_TIESHEET.ERROR })
      toast.error('Error Editing Group')
      return 0
    }
  }
}

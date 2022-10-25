import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import {
  TOURNAMENT,
  ADD_TOURNAMENT,
  EDIT_TOURNAMENT,
  DELETE_TOURNAMENT,
} from '.'

export function getAllTournaments() {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: TOURNAMENT.LOADING })
      res = await api(`${APIS.tournament}`)
      const { success, data } = res.data

      if (success) {
        dispatch({
          type: TOURNAMENT.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: TOURNAMENT.ERROR })
        toast.error('Error getting tournaments')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: TOURNAMENT.ERROR })
      toast.error('Error getting tournaments')
      return 0
    }
  }
}

export function addTournament(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_TOURNAMENT.LOADING })
      res = await api(`${APIS.tournament}`, 'POST', body)
      //console.log('create tournament res', res)
      const { success, message } = res.data
      //console.log('res data add group', message)
      if (success) {
        dispatch({
          type: ADD_TOURNAMENT.SUCCESS,
        })
        toast.success('Tournament created')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_TOURNAMENT.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_TOURNAMENT.ERROR })
      toast.error('Error Adding Tournament')
      return 0
    }
  }
}

export function editTournament(id: number, body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: EDIT_TOURNAMENT.LOADING })
      res = await api(`${APIS.tournament}/${id}`, 'PATCH', body)
      const { success, message } = res.data
      if (success) {
        dispatch({
          type: EDIT_TOURNAMENT.SUCCESS,
        })
        toast.success('Tournament updated')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: EDIT_TOURNAMENT.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: EDIT_TOURNAMENT.ERROR })
      toast.error('Error Adding Tournament')
      return 0
    }
  }
}

export function deleteTournament(id: number, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_TOURNAMENT.LOADING })
      res = await api(`${APIS.tournament}/${id}`, 'DELETE')
      const { success } = res.data

      if (success) {
        dispatch({
          type: DELETE_TOURNAMENT.SUCCESS,
          // payload: { data: data },
        })
        callBack && callBack()
        toast.success('Tournament Deleted')
        return 1
      } else {
        dispatch({ type: DELETE_TOURNAMENT.ERROR })
        toast.error('Error deleting tournaments')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_TOURNAMENT.ERROR })
      toast.error('Error deleting tournaments')
      return 0
    }
  }
}

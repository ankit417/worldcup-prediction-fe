import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { GAME, ADD_GAME, UPDATE_GAME } from '.'

export function getAllGame(groupId: number) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GAME.LOADING })
      res = await api(`${APIS.game}/${groupId}`)
      console.log('tournament', res)
      const { success, data } = res.data

      if (success) {
        dispatch({
          type: GAME.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: GAME.ERROR })
        toast.error('Error getting tournaments')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GAME.ERROR })
      toast.error('Error getting tournaments')
      return 0
    }
  }
}

export function addGame(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_GAME.LOADING })
      res = await api(`${APIS.game}`, 'POST', body)
      console.log('team', res)
      const { success, message } = res.data
      console.log('res data add group', message)
      if (success) {
        dispatch({
          type: ADD_GAME.SUCCESS,
        })
        toast.success('Group created')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_GAME.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_GAME.ERROR })
      toast.error('Error Adding Game')
      return 0
    }
  }
}

export function updateGame(id: number, body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: UPDATE_GAME.LOADING })
      res = await api(`${APIS.game}/${id}`, 'PATCH', body)
      console.log('team', res)
      const { success, message } = res.data
      console.log('res data add group', message)
      if (success) {
        dispatch({
          type: UPDATE_GAME.SUCCESS,
        })
        toast.success('Game updated')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: UPDATE_GAME.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: UPDATE_GAME.ERROR })
      toast.error('Error updating Game')
      return 0
    }
  }
}

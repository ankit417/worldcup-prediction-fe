import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { PREDICTION, USER_PREDICTION, CREATE_USER_PREDICTION } from '.'

export function getAllPrediction() {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: PREDICTION.LOADING })
      res = await api(`${APIS.prediction}`)
      //console.log('tournament', res)
      const { success, data } = res.data

      if (success) {
        dispatch({
          type: PREDICTION.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: PREDICTION.ERROR })
        toast.error('Error getting predictions')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: PREDICTION.ERROR })
      toast.error('Error getting tournaments')
      return 0
    }
  }
}

export function getUserPrediction() {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: USER_PREDICTION.LOADING })
      res = await api(`${APIS.userPrediction}`)
      //console.log('tournament', res)
      const { success, data } = res.data

      if (success) {
        dispatch({
          type: USER_PREDICTION.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: USER_PREDICTION.ERROR })
        toast.error('Error getting predictions')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: USER_PREDICTION.ERROR })
      toast.error('Error getting predictions')
      return 0
    }
  }
}

export function createUserPrediction(body: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: CREATE_USER_PREDICTION.LOADING })
      res = await api(`${APIS.predictGame}`, 'POST', body)
      //console.log('tournament', res)
      const { success } = res.data

      if (success) {
        // dispatch({
        //   type: CREATE_USER_PREDICTION.SUCCESS,
        //   payload: { data: data },
        // })
        return 1
      } else {
        dispatch({ type: CREATE_USER_PREDICTION.ERROR })
        toast.error('Error Adding prediction')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: CREATE_USER_PREDICTION.ERROR })
      toast.error('Error Adding predictions')
      return 0
    }
  }
}

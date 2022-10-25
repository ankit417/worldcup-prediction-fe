import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import {
  GET_TIESHEET_PREDICTION,
  ADD_TIESHEET_PREDICTION,
  DELETE_TIESHEET_PREDICTION,
} from '.'

//GET TIESHEET OF A USER BY GROUP ID
export function getUserTiesheet(groupId: number) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_TIESHEET_PREDICTION.LOADING })
      res = await api(`${APIS.userTiesheetPredictions}/${groupId}`)
      const { success, data } = res.data
      if (success) {
        dispatch({
          type: GET_TIESHEET_PREDICTION.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: GET_TIESHEET_PREDICTION.ERROR })
        toast.error('Error getting tiesheets')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_TIESHEET_PREDICTION.ERROR })
      toast.error('Error getting predictions')
      return 0
    }
  }
}

//ADD TIESHEET PREDICTION BY A USER
export function addTieSheetPrediction(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_TIESHEET_PREDICTION.LOADING })
      res = await api(`${APIS.userTiesheetPredictions}`, 'POST', body)
      //console.log('create tournament res', res)
      const { success, message } = res.data
      //console.log('res data add group', message)
      if (success) {
        dispatch({
          type: ADD_TIESHEET_PREDICTION.SUCCESS,
        })
        toast.success('Tiesheet added')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_TIESHEET_PREDICTION.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_TIESHEET_PREDICTION.ERROR })
      toast.error('Error Adding Tiesheet')
      return 0
    }
  }
}

//DELETE TIESHEET PREDICTION BY A USER
export function deleteTieSheetPrediction(id: number, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_TIESHEET_PREDICTION.LOADING })
      res = await api(`${APIS.userTiesheetPredictions}/${id}`, 'DELETE')
      //console.log('create tournament res', res)
      const { success, message } = res.data
      //console.log('res data add group', message)
      if (success) {
        dispatch({
          type: DELETE_TIESHEET_PREDICTION.SUCCESS,
        })
        toast.success('Tiesheet deleted')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: DELETE_TIESHEET_PREDICTION.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_TIESHEET_PREDICTION.ERROR })
      toast.error('Error deleting Tiesheet')
      return 0
    }
  }
}

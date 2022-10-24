import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { GET_TIESHEET_PREDICTION } from '.'

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

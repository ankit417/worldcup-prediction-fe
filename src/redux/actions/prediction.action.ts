import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { PREDICTION } from '.'

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

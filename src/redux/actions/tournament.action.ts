import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { TOURNAMENT } from '.'

export function getAllTournaments() {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: TOURNAMENT.LOADING })
      res = await api(`${APIS.tournament}`)
      console.log('tournament', res)
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

import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'

import { GAME } from '.'

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

import { USER } from '.'
import { api, APIS } from '../../config'
import { getCookie } from '../../helpers'

export function userAuthAction(
  loading: any,
  loginSuccess: any,
  loginFailure: any
) {
  return async function (dispatch: any) {
    let res
    try {
      if (!getCookie('token')) {
        return loading(false)
      }

      dispatch({ type: USER.LOADING })
      res = await api(APIS.user)
      const { success, data } = res.data
      if (success) {
        dispatch({ type: USER.SUCCESS, payload: data.data })

        if (data.type === 'success') {
          loginSuccess('ADMIN')
        } else {
          loginFailure()
        }

        loading(false)
        return 1
      } else {
        dispatch({ type: USER.ERROR })
        loading(false)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: USER.ERROR })
      loading(false)
      return 0
    }
  }
}

export function userAuthLogoutAction(callback: () => void) {
  return async function () {
    let res
    try {
      res = await api(APIS.logout)

      const { success } = res.data

      if (success) {
        callback()
        return 1
      }
      return 1
    } catch ({ message }) {
      return 0
    }
  }
}

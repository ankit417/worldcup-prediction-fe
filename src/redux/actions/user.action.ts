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
        console.log('No cookie')
        return loading(false)
      }
      console.log(' cookie here', getCookie('token'))
      dispatch({ type: USER.LOADING })
      console.log('Hitting user api')
      res = await api(APIS.user)
      const { success, data } = res.data
      console.log('Token success', data, success)
      if (success) {
        dispatch({ type: USER.SUCCESS, payload: data })
        if (success) {
          loginSuccess(data.role)
        } else {
          loginFailure()
        }
        loading(false)
        return 1
      } else {
        console.log('Login failure called')
        loginFailure()
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
    // let res
    try {
      // res = await api(APIS.logout)

      // const { success } = res.data
      const success = true
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

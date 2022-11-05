import { toast } from 'react-hot-toast'
import { api, APIS } from '../../config'
import {
  LOGIN,
  LOGOUT,
  PASSWORD,
  USER,
  CHANGE_PASSWORD,
  FORGET_PASSWORD,
  RESET_PASSWORD,
} from '.'

export function loginAction(body: any, callback: any) {
  return async function (dispatch: any) {
    let res
    try {
      // console.log('Here')
      dispatch({ type: LOGIN.LOADING })
      res = await api(APIS.login, 'POST', body)
      // console.log('Login action', res)

      const { success, data, message } = res.data
      // console.log('login action', res)
      if (success) {
        // console.log('user login success', data)
        // if (data.role === 'ADMIN') {
        dispatch({ type: LOGIN.SUCCESS })
        dispatch({ type: USER.SUCCESS, payload: data })
        callback && callback(data.accessToken, data.role)

        // toast.success(data.message)
        // } else {
        //   toast.error('Only Admin login is allowed')
        // }
        return 1
      } else {
        dispatch({ type: LOGIN.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: LOGIN.ERROR })
      toast.error(`Login Failed!!`)
      console.error(message)
      return 0
    }
  }
}

export function logoutAction(callback: any) {
  return async function (dispatch: any) {
    // let res
    try {
      dispatch({ type: LOGOUT.LOADING })
      // res = await api(APIS.logout)

      // const { success, data } = res.data
      const success = true

      if (success) {
        dispatch({ type: LOGOUT.SUCCESS })
        callback && callback()
        toast.success('Successful')
        // toast.success(data.message)
        return 1
      } else {
        dispatch({ type: LOGOUT.ERROR })
        toast.error('Error logging out')
        // toast.error(data.message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: LOGOUT.ERROR })
      toast(`Logout Failed!!`)
      console.error(message)
      return 0
    }
  }
}

export function passwordAction(body: any, modalCloseHandler: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: PASSWORD.LOADING })
      res = await api(APIS.changepassword, 'PATCH', body)

      const { success, message } = res.data

      if (success) {
        dispatch({ type: PASSWORD.SUCCESS })
        toast.success('Password Changed Successfully')
        modalCloseHandler()
        return 1
      } else {
        dispatch({ type: PASSWORD.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: PASSWORD.ERROR })
      console.error(message)
      toast.error('Error Changing Password')
      return 0
    }
  }
}

export function changePassword(body: any, successCallback: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: CHANGE_PASSWORD.LOADING })

      res = await api(`${APIS.forget}`, 'PATCH', body)

      const { success, data } = res.data

      if (success) {
        dispatch({ type: CHANGE_PASSWORD.SUCCESS })

        toast.success(data.message)
        successCallback && successCallback()
        return 1
      } else {
        dispatch({ type: CHANGE_PASSWORD.ERROR })
        toast.error(res.data.messager)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: CHANGE_PASSWORD.ERROR })
      toast.error(res.data.messager)
      console.error(message)
      return 0
    }
  }
}

export function forgetPassword(body: any, successCallback: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: FORGET_PASSWORD.LOADING })

      res = await api(`${APIS.forgot}`, 'POST', body)

      const { success, data } = res.data

      if (success) {
        dispatch({ type: FORGET_PASSWORD.SUCCESS })

        toast.success(data.message)
        successCallback && successCallback()
        return 1
      } else {
        dispatch({ type: FORGET_PASSWORD.ERROR })
        toast.error(res.data.message)

        return 0
      }
    } catch ({ message }) {
      dispatch({ type: FORGET_PASSWORD.ERROR })
      toast(res.data.message)
      console.error(message)
      return 0
    }
  }
}

export function resetPasswordAction(
  id: any,
  body: any,
  toast: any,
  successCallback: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: RESET_PASSWORD.LOADING })

      res = await api(`${APIS.resetpassword}/${id}`, 'PATCH', body)

      const { success, message } = res.data

      if (success) {
        dispatch({ type: RESET_PASSWORD.SUCCESS })
        // console.log('res.data')

        toast.success(message)
        successCallback && successCallback()
        return 1
      } else {
        dispatch({ type: RESET_PASSWORD.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: RESET_PASSWORD.ERROR })
      toast.error(message)
      console.error(message)
      return 0
    }
  }
}

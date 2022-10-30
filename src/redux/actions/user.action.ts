import { toast } from 'react-hot-toast'
import { USER, GET_USER_LIST, CREATE_USER, DELETE_USER } from '.'
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

export function getUserListAction() {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_USER_LIST.LOADING })
      res = await api(`${APIS.userlist}`)
      const { success, data } = res.data
      if (success) {
        dispatch({
          type: GET_USER_LIST.SUCCESS,
          payload: { data: data },
        })
        return 1
      } else {
        dispatch({ type: GET_USER_LIST.ERROR })
        toast.error('Error getting tournaments')
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_USER_LIST.ERROR })
      toast.error('Error getting tournaments')
      return 0
    }
  }
}

export function createUser(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: CREATE_USER.LOADING })
      res = await api(`${APIS.createUser}`, 'POST', body)
      //console.log('tournament add group', res)
      const { success, message } = res.data
      //console.log('res data add group', message)
      if (success) {
        dispatch({
          type: CREATE_USER.SUCCESS,
        })
        toast.success('User created')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: CREATE_USER.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: CREATE_USER.ERROR })
      toast.error('Error Creating User')
      return 0
    }
  }
}

export function deleteUser(id: number, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_USER.LOADING })
      res = await api(`${APIS.deleteuser}/${id}`, 'DELETE')
      console.log('delete user', res)
      const { success, message } = res.data
      console.log('success message', success, message)
      //console.log('res data add group', message)
      if (success) {
        dispatch({
          type: DELETE_USER.SUCCESS,
        })
        toast.success('User Deleted')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: DELETE_USER.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_USER.ERROR })
      toast.error('Error Deleting User')
      return 0
    }
  }
}

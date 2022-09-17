import { toast } from 'react-hot-toast'
import { api, APIS, TABLE_LIMIT } from '../../config'
import {
  ROOM_BOOKING_LIST,
  ACTIVE_ROOM_BOOKING_LIST,
  ROOM_BOOKING_DETAIL,
  DELETE_ROOM_BOOKING,
  ADD_ROOM_BOOKING,
  ADD_ROOM_TO_BOOKING_LIST,
  UPDATE_ROOM_BOOKING_DETAILS,
  UPDATE_BOOKED_ROOM_PRICE,
  UPDATE_CUSTOMER,
  DELETE_ROOM_FROM_BOOKING_LIST,
  CANCEL_ROOM_BOOKING,
} from '.'

export function getRoomBookings(
  page: number = 1,
  type?: 'checkedin' | 'checkedout' | 'reserved' | '',
  query?: string
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ROOM_BOOKING_LIST.LOADING })
      console.log(type)

      res = await api(
        `${APIS.roomBookings}?page=${page}&limit=${TABLE_LIMIT}${
          query ? `&search=${query}` : ``
        }${
          type
            ? type === 'checkedin'
              ? '&isActive=true&isCheckedOut=false'
              : type === 'checkedout'
              ? '&isActive=false&isCheckedOut=true'
              : type === 'reserved'
              ? '&isActive=false&isCheckedOut=false'
              : '&isActive=true&isCheckedOut=false'
            : ''
        }`
      )

      const { success, data, message } = res.data

      if (success) {
        dispatch({
          type: ROOM_BOOKING_LIST.SUCCESS,
          payload: { total: data.data.total, data: data.data.rows },
        })
        return 1
      } else {
        dispatch({ type: ROOM_BOOKING_LIST.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ROOM_BOOKING_LIST.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function getActiveRoomBookings() {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ACTIVE_ROOM_BOOKING_LIST.LOADING })
      res = await api(`${APIS.roomBookings}/unlinked`)

      const {
        success,
        data: { data: activeRoomBookings, message },
      } = res.data

      if (success) {
        const _data =
          Array.isArray(activeRoomBookings) &&
          activeRoomBookings.map((item: any) => {
            return {
              value: item.booking_detail?.id,
              name: item.customer_detail?.name,
              label: `${item.customer_detail?.name} - ${item.customer_detail?.phone} (Rs. ${item.booking_detail?.net_total})`,
            }
          })
        dispatch({
          type: ACTIVE_ROOM_BOOKING_LIST.SUCCESS,
          payload: _data,
        })
        return 1
      } else {
        dispatch({ type: ACTIVE_ROOM_BOOKING_LIST.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ACTIVE_ROOM_BOOKING_LIST.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function getRoomBookingDetails(roomBookingId: number, callback?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ROOM_BOOKING_DETAIL.LOADING })
      res = await api(`${APIS.roomBookings}/${roomBookingId}`)

      const { success, data, message } = res.data

      if (success) {
        dispatch({
          type: ROOM_BOOKING_DETAIL.SUCCESS,
          payload: data.data,
        })
        callback && callback()
        return 1
      } else {
        dispatch({ type: ROOM_BOOKING_DETAIL.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ROOM_BOOKING_DETAIL.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function addRoomBooking(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_ROOM_BOOKING.LOADING })
      res = await api(`${APIS.roomBookings}`, 'POST', body)

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: ADD_ROOM_BOOKING.SUCCESS,
        })
        toast.success('Room Booking Added!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_ROOM_BOOKING.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_ROOM_BOOKING.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function checkoutRoomBooking(
  body: any,
  roomBookingId: number,
  callback?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_ROOM_BOOKING.LOADING })
      res = await api(
        `${APIS.roomBookings}/${roomBookingId}/checkout`,
        'PATCH',
        body
      )

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: DELETE_ROOM_BOOKING.SUCCESS,
        })
        toast.success('Room booking checked out!')
        callback && callback()
        return 1
      } else {
        dispatch({ type: DELETE_ROOM_BOOKING.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_ROOM_BOOKING.ERROR })
      toast.error(`Error deleting data`)
      console.error(message)
      return 0
    }
  }
}

export function addRoomToBookingList(
  body: any,
  roomBookId: any,
  callBack?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_ROOM_TO_BOOKING_LIST.LOADING })
      res = await api(`${APIS.roomBookings}/${roomBookId}/room`, 'POST', body)

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: ADD_ROOM_TO_BOOKING_LIST.SUCCESS,
        })
        toast.success('Room Booking Added!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_ROOM_TO_BOOKING_LIST.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_ROOM_TO_BOOKING_LIST.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function udpateBookedRoomPrice(
  body: any,
  roomBookId: any,
  roomId: any,
  callBack?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: UPDATE_BOOKED_ROOM_PRICE.LOADING })
      res = await api(
        `${APIS.roomBookings}/${roomBookId}/room/${roomId}`,
        'PATCH',
        body
      )

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: UPDATE_BOOKED_ROOM_PRICE.SUCCESS,
        })
        toast.success('Room Price Updated!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: UPDATE_BOOKED_ROOM_PRICE.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: UPDATE_BOOKED_ROOM_PRICE.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function deleteBookedRoom(roomBookId: any, roomId: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_ROOM_FROM_BOOKING_LIST.LOADING })
      res = await api(
        `${APIS.roomBookings}/${roomBookId}/room/${roomId}`,
        'DELETE'
      )

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: DELETE_ROOM_FROM_BOOKING_LIST.SUCCESS,
        })
        toast.success('Booked Room Deleted from list!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: DELETE_ROOM_FROM_BOOKING_LIST.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_ROOM_FROM_BOOKING_LIST.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function updateRoomBookingDetails(
  body: any,
  roomBookId: any,
  callBack?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: UPDATE_ROOM_BOOKING_DETAILS.LOADING })
      res = await api(`${APIS.roomBookings}/${roomBookId}`, 'PATCH', body)

      const {
        success,
        data: { message },
        message: errorMessage,
      } = res.data

      if (success) {
        dispatch({
          type: UPDATE_ROOM_BOOKING_DETAILS.SUCCESS,
        })
        toast.success(message)
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: UPDATE_ROOM_BOOKING_DETAILS.ERROR })
        toast.error(errorMessage)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: UPDATE_ROOM_BOOKING_DETAILS.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function updateCustomer(body: any, customerId: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: UPDATE_CUSTOMER.LOADING })
      res = await api(`${APIS.customer}/${customerId}`, 'PATCH', body)

      const {
        success,
        data: { message },
        message: errorMessage,
      } = res.data

      if (success) {
        dispatch({
          type: UPDATE_CUSTOMER.SUCCESS,
        })
        toast.success(message)
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: UPDATE_CUSTOMER.ERROR })
        toast.error(errorMessage)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: UPDATE_CUSTOMER.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export const deleteBooking = (id: number, navigate: (arg: string) => void) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: CANCEL_ROOM_BOOKING.LOADING })
      await api(`${APIS.roomBookings}/${id}`, 'DELETE')
      toast.success(`Successfully canceled booking`)
      navigate(`/hotel`)
      dispatch({ type: CANCEL_ROOM_BOOKING.SUCCESS })

      return 0
    } catch ({ message }) {
      dispatch({ type: CANCEL_ROOM_BOOKING.ERROR })

      toast.error(`Cannot cancel current booking`)
      console.error(message)
      return 0
    }
  }
}

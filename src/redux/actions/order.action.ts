import { toast } from 'react-hot-toast'
import { api, APIS, TABLE_LIMIT } from '../../config'
import {
  ADD_ORDER,
  DELETE_ORDER,
  ADD_ORDER_ITEM_TO_ORDER,
  GET_ALL_ORDERS,
  UPDATE_ORDER,
  GET_ORDER_BY_ID,
  GET_ORDERS_BY_BOOKING_ID,
  CHANGE_ORDER_PAID_STATUS,
  UPDATE_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  GET_ORDER_ITEM_BY_ID,
} from '.'

export function getAllOrders(
  page: number = 1,
  type?: 'paid' | 'unpaid' | undefined,
  query?: string
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_ALL_ORDERS.LOADING })
      res = await api(
        `${APIS.order}?page=${page}&limit=${TABLE_LIMIT}${
          query ? `&search=${query}` : ``
        }${type ? (type === 'paid' ? '&isPaid=true' : '&isPaid=false') : ''}`
      )

      const {
        success,
        data: { data, message },
      } = res.data

      if (success) {
        dispatch({
          type: GET_ALL_ORDERS.SUCCESS,
          payload: { total: data.total, data: data.rows },
        })
        return 1
      } else {
        dispatch({ type: GET_ALL_ORDERS.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_ALL_ORDERS.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function getOrderById(
  orderId: number,
  query?: string,
  noLoader?: boolean,
  callback?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      !noLoader && dispatch({ type: GET_ORDER_BY_ID.LOADING })
      res = await api(
        `${APIS.order}/${orderId}${query ? `?search=${query}` : ''}`
      )

      const {
        success,
        data: { type, data, message },
      } = res.data

      if (type === 'failure') {
        toast.error(message)
      }

      if (success) {
        dispatch({
          type: GET_ORDER_BY_ID.SUCCESS,
          payload: data,
        })

        callback && callback()
        return 1
      } else {
        dispatch({ type: GET_ORDER_BY_ID.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_ORDER_BY_ID.ERROR })
      toast.error(`Error fetching data!`)
      console.error(message)
      return 0
    }
  }
}

export function getAllOrdersByBookingId(bookingId: number, callback?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_ORDERS_BY_BOOKING_ID.LOADING })
      res = await api(`${APIS.order}/${bookingId}/room-booking`)

      const {
        success,
        data: { data, message },
      } = res.data

      if (success) {
        dispatch({
          type: GET_ORDERS_BY_BOOKING_ID.SUCCESS,
          payload: data,
        })

        callback && callback()
        return 1
      } else {
        dispatch({ type: GET_ORDERS_BY_BOOKING_ID.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_ORDERS_BY_BOOKING_ID.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function deleteOrder(orderId: number, callback?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_ORDER.LOADING })
      res = await api(`${APIS.order}/${orderId}`, 'DELETE')

      const {
        success,
        data: { message },
      } = res.data

      if (success) {
        dispatch({
          type: DELETE_ORDER.SUCCESS,
        })
        toast.success('Order deleted!')
        callback && callback()
        return 1
      } else {
        dispatch({ type: DELETE_ORDER.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_ORDER.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function addOrder(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_ORDER.LOADING })
      res = await api(`${APIS.order}`, 'POST', body)

      const {
        success,
        data: { message },
      } = res.data

      if (success) {
        dispatch({
          type: ADD_ORDER.SUCCESS,
        })
        toast.success('Order Added!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_ORDER.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_ORDER.ERROR })
      toast.error(`Error adding data!`)
      console.error(message)
      return 0
    }
  }
}

export function changeOrderStatus(orderId: number, body: any, callback?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: CHANGE_ORDER_PAID_STATUS.LOADING })
      res = await api(`${APIS.order}/${orderId}/paid`, 'PATCH', body)

      const {
        success,
        data: { message },
      } = res.data

      if (success) {
        dispatch({
          type: CHANGE_ORDER_PAID_STATUS.SUCCESS,
        })
        toast.success('Order Paid!')
        callback && callback()
        return 1
      } else {
        dispatch({ type: CHANGE_ORDER_PAID_STATUS.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: CHANGE_ORDER_PAID_STATUS.ERROR })
      toast.error(`Error deleting data`)
      console.error(message)
      return 0
    }
  }
}

export function updateOrder(orderId: number, body: any, callback?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: UPDATE_ORDER.LOADING })
      res = await api(`${APIS.order}/${orderId}`, 'PATCH', body)

      const {
        success,
        data: { message },
      } = res.data

      if (success) {
        dispatch({
          type: UPDATE_ORDER.SUCCESS,
        })
        callback && callback()
        return 1
      } else {
        dispatch({ type: UPDATE_ORDER.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: UPDATE_ORDER.ERROR })
      toast.error(`Error updating order!`)
      console.error(message)
      return 0
    }
  }
}

//! Order ITEMS' ACTION

export function addOrderItemToOrder(body: any, orderId: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_ORDER_ITEM_TO_ORDER.LOADING })
      res = await api(`${APIS.order}/${orderId}/order-item`, 'POST', body)

      const {
        success,
        data: { message },
      } = res.data

      if (success) {
        dispatch({
          type: ADD_ORDER_ITEM_TO_ORDER.SUCCESS,
        })
        toast.success('Order Item Added!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_ORDER_ITEM_TO_ORDER.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_ORDER_ITEM_TO_ORDER.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function udpateOrderItem(
  body: any,
  orderId: any,
  orderItemId: any,
  callBack?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: UPDATE_ORDER_ITEM.LOADING })
      res = await api(
        `${APIS.order}/${orderId}/order-item/${orderItemId}`,
        'PATCH',
        body
      )

      const {
        success,
        data: { message },
      } = res.data

      if (success) {
        dispatch({
          type: UPDATE_ORDER_ITEM.SUCCESS,
        })
        toast.success('Order Item Updated!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: UPDATE_ORDER_ITEM.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: UPDATE_ORDER_ITEM.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function deleteOrderItem(
  orderId: any,
  orderItemId: any,
  callBack?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_ORDER_ITEM.LOADING })
      res = await api(
        `${APIS.order}/${orderId}/order-item/${orderItemId}`,
        'DELETE'
      )

      const {
        success,
        data: { message },
      } = res.data

      if (success) {
        dispatch({
          type: DELETE_ORDER_ITEM.SUCCESS,
        })
        toast.success('Order Item Deleted!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: DELETE_ORDER_ITEM.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_ORDER_ITEM.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function getOrderItemById(
  orderId: any,
  orderItemId: any,
  callBack?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_ORDER_ITEM_BY_ID.LOADING })
      res = await api(`${APIS.order}/${orderId}/order-item/${orderItemId}`)

      const {
        success,
        data: {
          data: { order_item_details: value },
          message,
        },
      } = res.data

      if (success) {
        dispatch({
          type: GET_ORDER_ITEM_BY_ID.SUCCESS,
          payload: value,
        })
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: GET_ORDER_ITEM_BY_ID.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_ORDER_ITEM_BY_ID.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

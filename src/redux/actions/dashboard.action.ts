import { api, APIS, TABLE_LIMIT } from '../../config'
import toast from 'react-hot-toast'
import {
  GET_TOTAL_REVENUE,
  GET_PAYMENTS,
  GET_PAYMENT_LIST,
  GET_LATEST_ORDERS,
  GET_LATEST_BOOKINGS,
} from '.'

export const getTotalRevenue = (startDate: string, endDate: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GET_TOTAL_REVENUE.LOADING })
      const res = await api(
        `${APIS.dashboard}?startDate=${startDate}&endDate=${endDate}`
      )
      const {
        data: { data },
      } = res.data

      dispatch({ type: GET_TOTAL_REVENUE.SUCCESS, payload: data })

      return 0
    } catch ({ message }) {
      dispatch({ type: GET_TOTAL_REVENUE.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export const getPayments = (
  startDate: string,
  endDate: string,
  type: string
) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GET_PAYMENTS.LOADING })
      const res = await api(
        `${APIS.dashboard}/payments?startDate=${startDate}&endDate=${endDate}&type=${type}`
      )
      const {
        data: { data },
      } = res.data
      dispatch({
        type: GET_PAYMENTS.SUCCESS,
        payload: data,
      })

      return 1
    } catch ({ message }) {
      dispatch({ type: GET_PAYMENTS.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export const getPaymentList = (
  startDate: string,
  endDate: string,
  type: string,
  paymentMethod: string,
  page: number
) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GET_PAYMENT_LIST.LOADING })

      const res = await api(
        `${
          APIS.dashboard
        }/list?startDate=${startDate}&endDate=${endDate}&type=${type}&paymentMethod=${paymentMethod}&page=${
          page || 1
        }&limit=${TABLE_LIMIT}`
      )
      const {
        data: { data },
      } = res.data
      dispatch({
        type: GET_PAYMENT_LIST.SUCCESS,
        payload: { rows: data.rows, total: Number(data.total) },
      })

      return 1
    } catch ({ message }) {
      dispatch({ type: GET_PAYMENT_LIST.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export const getLatestOrders = () => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GET_LATEST_ORDERS.LOADING })

      const res = await api(`${APIS.order}?limit=5`)
      const {
        data: { data },
      } = res.data
      dispatch({
        type: GET_LATEST_ORDERS.SUCCESS,
        payload: { rows: data.rows },
      })

      return 1
    } catch ({ message }) {
      dispatch({ type: GET_LATEST_ORDERS.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export const getLatestRoomBookings = () => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GET_LATEST_BOOKINGS.LOADING })

      const res = await api(`${APIS.roomBookings}?limit=5`)
      const {
        data: { data },
      } = res.data
      dispatch({
        type: GET_LATEST_BOOKINGS.SUCCESS,
        payload: { rows: data.rows },
      })

      return 1
    } catch ({ message }) {
      dispatch({ type: GET_LATEST_BOOKINGS.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

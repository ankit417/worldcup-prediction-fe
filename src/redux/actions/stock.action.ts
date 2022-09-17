import toast from 'react-hot-toast'

import {
  ADD_STOCK,
  DELETE_STOCK,
  EDIT_STOCK,
  STOCK_DETAIL,
  STOCK_LIST,
  GET_STOCK_HISTORY_LIST,
  UPDATE_STOCK_QUANTITY,
  SEARCH_STOCK,
  SEARCHED_HISTORY_LIST,
} from '.'
import { api, APIS, TABLE_LIMIT } from '../../config'

export function addStockAction(formdata: any, goBackHandler: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_STOCK.LOADING })
      res = await api(APIS.stock, 'POST', formdata, { file: true })
      const { success, data } = res.data

      if (success === true) {
        dispatch({ type: ADD_STOCK.SUCCESS })
        toast.success('Item successfully Added')
        goBackHandler()
      } else {
        dispatch({ type: ADD_STOCK.ERROR })
        toast.error(data.message)
      }
    } catch ({ message }) {
      dispatch({ type: ADD_STOCK.ERROR })
      console.error(message)
      toast.error('Error Adding Item')
      // return 0;
    }
  }
}

export function editStockAction(id: any, formData: any, goBackHandler: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: EDIT_STOCK.LOADING })

      // const removeImagePromise = new Promise(async (resolve, reject) => {
      //   if (imageBody.index?.length === 0) {
      //     return resolve("no remove");
      //   } else {
      //     let photoRes = await api(
      //       `${APIS.stock}/image/${id}`,
      //       "DELETE",
      //       imageBody
      //     );
      //     const { success: photoSuccess, data: photoData } = photoRes.data;
      //     if (photoSuccess) {
      //       resolve("success");
      //     } else {
      //       dispatch({ type: EDIT_STOCK.ERROR });
      //       toast.error(photoData.message);
      //       reject();
      //     }
      //   }
      // });

      // removeImagePromise.then(async () => {
      res = await api(`${APIS.stock}/${id}`, 'PATCH', formData, {
        file: true,
      })

      const { success, data } = res.data
      if (success === true) {
        dispatch({ type: EDIT_STOCK.SUCCESS })
        toast.success('Item successfully Edited')
        goBackHandler()
      } else {
        dispatch({ type: EDIT_STOCK.ERROR })
        toast.error(data.message)
      }
      // });
    } catch ({ message }) {
      dispatch({ type: EDIT_STOCK.ERROR })
      console.error(message)
      toast.error('Error Editing Item')
      // return 0;
    }
  }
}

export function getStockListAction(page: any = 1, query?: string) {
  return async function (dispatch: any) {
    let res
    try {
      if (page === 1) {
        dispatch({ type: STOCK_LIST.CLEAR })
      }
      dispatch({ type: STOCK_LIST.LOADING })
      res = await api(
        `${APIS.stock}?page=${page}&limit=${TABLE_LIMIT}${
          query ? `&search=${query}` : ''
        }`
      )
      const { success, data } = res.data
      if (success === true) {
        dispatch({ type: STOCK_LIST.SUCCESS, payload: data.data })
      } else {
        dispatch({ type: STOCK_LIST.ERROR })
      }
    } catch ({ message }) {
      dispatch({ type: STOCK_LIST.ERROR })
      console.error(message)
      // return 0;
    }
  }
}

export function getStockDetailAction(id: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: STOCK_DETAIL.LOADING })
      res = await api(`${APIS.stock}/${id}`)
      const { success, data } = res.data
      if (success === true) {
        dispatch({ type: STOCK_DETAIL.SUCCESS, payload: data.data })
      } else {
        dispatch({ type: STOCK_DETAIL.ERROR })
      }
    } catch ({ message }) {
      dispatch({ type: STOCK_DETAIL.ERROR })
      console.error(message)
      //   return 0;
    }
  }
}

export function deleteStockAction(id: any, callback: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: DELETE_STOCK.LOADING })
      res = await api(`${APIS.stock}/${id}`, 'DELETE')

      const { success, data } = res.data

      if (success === true) {
        dispatch(getStockListAction(1))
        callback && callback()
        toast.success('Item successfully deleted')
      } else {
        dispatch({ type: DELETE_STOCK.ERROR })
        toast.error(data.message)
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_STOCK.ERROR })
      toast.error('Error Deleting Item')
      console.error(message)
      // return 0;
    }
  }
}

// STOCK HISTORY
export function getStockHistoryList(
  page: number,
  limit: number,
  startDate: string,
  endDate: string,
  search?: string
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_STOCK_HISTORY_LIST.LOADING })

      res = await api(
        `${APIS.stock}/history?page=${page || 1}&limit=${limit}${
          search ? `&search=${search}` : ''
        }${startDate ? `&startDate=${startDate}` : ''}${
          endDate ? `&endDate=${endDate}` : ''
        }`,
        'GET'
      )

      const { data } = res.data
      dispatch({ type: GET_STOCK_HISTORY_LIST.SUCCESS, payload: data.data })
      // });
    } catch ({ message }) {
      dispatch({ type: GET_STOCK_HISTORY_LIST.ERROR })
      console.error(message)
      toast.error('Error getting stock history')
      // return 0;
    }
  }
}

export function updateStockQuantity(
  id: number,
  value: number,
  description: string,
  type: 'add' | 'remove',
  callback?: any
) {
  return async function (dispatch: any) {
    try {
      dispatch({ type: UPDATE_STOCK_QUANTITY.LOADING })

      await api(`${APIS.stock}/${id}/quantity/${type}`, 'PUT', {
        quantity: value,
        description: description || undefined,
      })

      // throw Error('test error')

      dispatch({ type: UPDATE_STOCK_QUANTITY.SUCCESS })
      toast.success(`Successfully ${type}ed stock`)
      callback && callback()
    } catch ({ message }) {
      dispatch({ type: UPDATE_STOCK_QUANTITY.ERROR })
      console.error(message)
      toast.error('Error updating stock quantity')
      // return 0;
    }
  }
}

export function searchStock(val: string) {
  return async (dispatch: any) => {
    try {
      if (val === '') return
      dispatch({ type: SEARCH_STOCK.LOADING })
      const res = await api(
        `${APIS.stock}?page=1&limit=${TABLE_LIMIT}&search=${val}`,
        'GET'
      )

      const {
        data: { data },
      } = res.data

      dispatch({ type: SEARCH_STOCK.SUCCESS, payload: data.rows })
    } catch ({ message }) {
      dispatch({ type: SEARCH_STOCK.ERROR })
      console.error(message)
      toast.error('Error occured while searching for stock.')
      // return 0;
    }
  }
}

export function getHistoryByStockId(
  id: number,
  page: number,
  startDate: string,
  endDate: string
) {
  return async (dispatch: any) => {
    dispatch({ type: SEARCHED_HISTORY_LIST.LOADING })
    const res = await api(
      `${APIS.stock}/${id}/history?page=${page}&limit=${TABLE_LIMIT}${
        startDate ? `&startDate=${startDate}` : ''
      }${endDate ? `&endDate=${endDate}` : ''}`,
      'GET'
    )

    const {
      data: { data },
    } = res.data

    dispatch({ type: SEARCHED_HISTORY_LIST.SUCCESS, payload: data })
    try {
    } catch ({ message }) {
      console.log(message)
      dispatch({ type: SEARCHED_HISTORY_LIST.ERROR, payload: data })
    }
  }
}

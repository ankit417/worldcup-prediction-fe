import { toast } from 'react-hot-toast'
import { api, APIS, TABLE_LIMIT } from '../../config'
import {
  UPDATE_MENU_ITEM,
  GET_ALL_MENU_ITEM,
  CHANGE_MENU_ITEM_DELETE_STATUS,
  ADD_CATEGORY,
  ADD_MENU_ITEM_TO_CATEGORY,
  GET_ALL_CATEGORIES,
  UPDATE_CATEGORY,
  GET_CATEGORY_BY_ID,
  CHANGE_CATEGORY_DELETE_STATUS,
  GET_ACTIVE_MENU_ITEM,
  GET_MENU_ITEM_BY_ID,
} from '.'

export function getAllCategories(
  page: number = 1,
  type?: 'active' | 'inactive',
  query?: string,
  limit?: number
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_ALL_CATEGORIES.LOADING })
      res = await api(
        `${APIS.category}/${type ?? 'all'}?page=${page}&limit=${
          limit ?? TABLE_LIMIT
        }${query ? `&search=${query}` : ``}`
      )

      const { success, data, message } = res.data

      if (success) {
        dispatch({
          type: GET_ALL_CATEGORIES.SUCCESS,
          payload: { total: data.data.total, data: data.data.rows },
        })
        return 1
      } else {
        dispatch({ type: GET_ALL_CATEGORIES.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_ALL_CATEGORIES.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function getCategoryById(
  categoryId: number,
  query?: string,
  noLoader?: boolean,
  callback?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      !noLoader && dispatch({ type: GET_CATEGORY_BY_ID.LOADING })
      res = await api(
        `${APIS.category}/${categoryId}${query ? `?search=${query}` : ''}`
      )

      const { success, data, message } = res.data

      if (success) {
        dispatch({
          type: GET_CATEGORY_BY_ID.SUCCESS,
          payload: data.data,
        })

        callback && callback()
        return 1
      } else {
        dispatch({ type: GET_CATEGORY_BY_ID.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_CATEGORY_BY_ID.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function addCategory(body: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_CATEGORY.LOADING })
      res = await api(`${APIS.category}`, 'POST', body)

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: ADD_CATEGORY.SUCCESS,
        })
        toast.success('Category Added!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_CATEGORY.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_CATEGORY.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function changeCategoryStatus(
  categoryId: number,
  isDeleted: boolean,
  callback?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: CHANGE_CATEGORY_DELETE_STATUS.LOADING })
      res = await api(
        `${APIS.category}/${categoryId}?deleted=${!isDeleted}`,
        'PUT'
      )

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: CHANGE_CATEGORY_DELETE_STATUS.SUCCESS,
        })
        toast.success('Category Status Changed!')
        callback && callback()
        return 1
      } else {
        dispatch({ type: CHANGE_CATEGORY_DELETE_STATUS.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: CHANGE_CATEGORY_DELETE_STATUS.ERROR })
      toast.error(`Error deleting data`)
      console.error(message)
      return 0
    }
  }
}

export function updateCategory(body: any, categoryId: number, callback?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: UPDATE_CATEGORY.LOADING })
      res = await api(`${APIS.category}/${categoryId}`, 'PATCH', body)

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: UPDATE_CATEGORY.SUCCESS,
        })
        callback && callback()
        return 1
      } else {
        dispatch({ type: UPDATE_CATEGORY.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: UPDATE_CATEGORY.ERROR })
      toast.error(`Error deleting data`)
      console.error(message)
      return 0
    }
  }
}

//! MENU ITEMS' ACTION

export function addMenuItemToCategory(
  body: any,
  categoryId: any,
  callBack?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: ADD_MENU_ITEM_TO_CATEGORY.LOADING })
      res = await api(`${APIS.category}/${categoryId}/menu-items`, 'POST', body)

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: ADD_MENU_ITEM_TO_CATEGORY.SUCCESS,
        })
        toast.success('Menu Item Added!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: ADD_MENU_ITEM_TO_CATEGORY.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: ADD_MENU_ITEM_TO_CATEGORY.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function getAllMenuItems(
  page: number = 1,
  type?: 'active' | 'inactive',
  query?: string,
  limit: number = TABLE_LIMIT
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_ALL_MENU_ITEM.LOADING })
      res = await api(
        `/menu-items/${type ?? 'all'}?page=${page}&limit=${limit}${
          query ? `&search=${query}` : ``
        }`
      )

      const { success, data, message } = res.data

      if (success) {
        dispatch({
          type: GET_ALL_MENU_ITEM.SUCCESS,
          payload: { total: data.data.total, data: data.data.rows },
        })
        return 1
      } else {
        dispatch({ type: GET_ALL_MENU_ITEM.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_ALL_MENU_ITEM.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function getMenuItemById(
  menuId: number,
  menuItemId: number,
  callback?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_MENU_ITEM_BY_ID.LOADING })
      res = await api(`/menu/${menuId}/menu-items/${menuItemId}`)

      const {
        success,
        data: { data, message },
      } = res.data

      if (success) {
        dispatch({
          type: GET_MENU_ITEM_BY_ID.SUCCESS,
          payload: data.menu_item_details,
        })
        callback && callback()
        return 1
      } else {
        dispatch({ type: GET_MENU_ITEM_BY_ID.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_MENU_ITEM_BY_ID.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function getActiveMenuItemsWithoutPagination() {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: GET_ACTIVE_MENU_ITEM.LOADING })
      res = await api(`/menu-items/active?page=1&limit=100`)

      const {
        success,
        data: { data, message },
      } = res.data

      if (success) {
        dispatch({
          type: GET_ACTIVE_MENU_ITEM.SUCCESS,
          payload: data.rows,
        })
        return 1
      } else {
        dispatch({ type: GET_ACTIVE_MENU_ITEM.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: GET_ACTIVE_MENU_ITEM.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function udpateMenuItem(body: any, menuItemId: any, callBack?: any) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: UPDATE_MENU_ITEM.LOADING })
      res = await api(`/menu-items/${menuItemId}`, 'PATCH', body)

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: UPDATE_MENU_ITEM.SUCCESS,
        })
        toast.success('Menu Item Updated!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: UPDATE_MENU_ITEM.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: UPDATE_MENU_ITEM.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

export function changeMenuItemStatus(
  menuItemId: any,
  isDeleted: boolean,
  callBack?: any
) {
  return async function (dispatch: any) {
    let res
    try {
      dispatch({ type: CHANGE_MENU_ITEM_DELETE_STATUS.LOADING })

      res = await api(`/menu-items/${menuItemId}?deleted=${!isDeleted}`, 'PUT')

      const { success, message } = res.data

      if (success) {
        dispatch({
          type: CHANGE_MENU_ITEM_DELETE_STATUS.SUCCESS,
        })
        toast.success('Menu Item status changed!')
        callBack && callBack()
        return 1
      } else {
        dispatch({ type: CHANGE_MENU_ITEM_DELETE_STATUS.ERROR })
        toast.error(message)
        return 0
      }
    } catch ({ message }) {
      dispatch({ type: CHANGE_MENU_ITEM_DELETE_STATUS.ERROR })
      toast.error(`Error fetching data`)
      console.error(message)
      return 0
    }
  }
}

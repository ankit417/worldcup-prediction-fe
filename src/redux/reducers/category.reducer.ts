import {
  // UPDATE_MENU_ITEM,
  GET_ALL_MENU_ITEM,
  GET_ACTIVE_MENU_ITEM,
  // CHANGE_MENU_ITEM_DELETE_STATUS,
  // ADD_CATEGORY,
  // ADD_MENU_ITEM_TO_CATEGORY,
  GET_ALL_CATEGORIES,
  // UPDATE_CATEGORY,
  GET_CATEGORY_BY_ID,
  GET_MENU_ITEM_BY_ID,
  // CHANGE_CATEGORY_DELETE_STATUS,
} from '../actions'

const initalState: {
  categoryListLoading: boolean
  categoryList: Array<object>
  categoryListTotalCount: number

  categoryDetailLoading: boolean
  categoryDetail: object

  menuItemList: Array<object>
  menuItemListLoading: boolean

  menuItem: object
  menuItemLoading: boolean

  activeMenuItemList: Array<object>
  activeMenuItemListLoading: boolean
} = {
  categoryListLoading: false,
  categoryList: [],
  categoryListTotalCount: 0,

  categoryDetailLoading: true,
  categoryDetail: {},

  menuItemList: [],
  menuItemListLoading: false,

  menuItem: {},
  menuItemLoading: false,

  activeMenuItemList: [],
  activeMenuItemListLoading: false,
}

export function categoriesReducer(state = initalState, action: any) {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_CATEGORIES.LOADING:
      return { ...state, categoryListLoading: true }
    case GET_ALL_CATEGORIES.SUCCESS:
      return {
        ...state,
        categoryListLoading: false,
        categoryList: payload.data,
        categoryListTotalCount: payload.total,
      }
    case GET_ALL_CATEGORIES.ERROR:
      return { ...state, categoryListLoading: false }

    case GET_CATEGORY_BY_ID.LOADING:
      return { ...state, categoryDetailLoading: true }
    case GET_CATEGORY_BY_ID.SUCCESS:
      return {
        ...state,
        categoryDetailLoading: false,
        categoryDetail: payload,
        categoryDetailTotalCount: payload.total,
      }

    case GET_CATEGORY_BY_ID.ERROR:
      return { ...state, categoryDetailLoading: false }

    case GET_ALL_MENU_ITEM.LOADING:
      return { ...state, menuItemListLoading: true }
    case GET_ALL_MENU_ITEM.SUCCESS:
      return {
        ...state,
        menuItemListLoading: false,
        menuItemList: payload,
      }
    case GET_ALL_MENU_ITEM.ERROR:
      return { ...state, menuItemListLoading: false }

    case GET_ACTIVE_MENU_ITEM.LOADING:
      return { ...state, activeMenuItemListLoading: true }
    case GET_ACTIVE_MENU_ITEM.SUCCESS:
      return {
        ...state,
        activeMenuItemListLoading: false,
        activeMenuItemList: payload,
      }
    case GET_ACTIVE_MENU_ITEM.ERROR:
      return { ...state, activeMenuItemListLoading: false }

    case GET_MENU_ITEM_BY_ID.LOADING:
      return { ...state, menuItemLoading: true }
    case GET_MENU_ITEM_BY_ID.SUCCESS:
      return {
        ...state,
        menuItemLoading: false,
        menuItem: payload,
      }
    case GET_MENU_ITEM_BY_ID.ERROR:
      return { ...state, menuItemLoading: false }

    default:
      return state
  }
}

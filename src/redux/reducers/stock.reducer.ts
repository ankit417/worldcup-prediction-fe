import {
  STOCK_LIST,
  STOCK_DETAIL,
  ADD_STOCK,
  DELETE_STOCK,
  EDIT_STOCK,
  GET_STOCK_HISTORY_LIST,
  UPDATE_STOCK_QUANTITY,
  SEARCH_STOCK,
  SEARCHED_HISTORY_LIST,
} from '../actions'

const initalState: any = {
  stockListLoading: false,
  stockList: [],
  totalCount: null,

  detail: null,
  detailLoading: false,

  addLoading: false,

  editLoading: false,

  deleteLoading: false,

  stockHistoryList: [],
  stockHistoryLoading: false,
  stockHistoryTotalCount: 0,

  updateStockQuantityLoading: false,

  stockSearchList: null,
  stockSearchListLoading: false,

  searchedHistoryList: [],
  searchedHistoryListLoading: false,
  searchedHistoryListTotal: 0,
}

export function stockReducer(state = initalState, action: any) {
  const { type, payload } = action
  switch (type) {
    case STOCK_LIST.CLEAR:
      return {
        ...state,
        stockListLoading: true,
        stockList: [],
      }
    case STOCK_LIST.LOADING:
      return { ...state, stockListLoading: true, stockList: [] }
    case STOCK_LIST.SUCCESS:
      return {
        ...state,
        stockListLoading: false,
        stockList: payload.rows,
        totalCount: +payload.total,
      }
    case STOCK_LIST.ERROR:
      return { ...state, stockListLoading: false }

    case STOCK_DETAIL.LOADING:
      return { ...state, detailLoading: true, detail: null }
    case STOCK_DETAIL.SUCCESS:
      return {
        ...state,
        detailLoading: false,
        detail: payload,
      }
    case STOCK_DETAIL.ERROR:
      return { ...state, detailLoading: false }
    case ADD_STOCK.LOADING:
      return { ...state, addLoading: true }
    case ADD_STOCK.SUCCESS:
      return {
        ...state,
        addLoading: false,
      }
    case ADD_STOCK.ERROR:
      return { ...state, addLoading: false }

    case EDIT_STOCK.LOADING:
      return { ...state, editLoading: true }
    case EDIT_STOCK.SUCCESS:
      return {
        ...state,
        editLoading: false,
      }
    case EDIT_STOCK.ERROR:
      return { ...state, editLoading: false }

    case DELETE_STOCK.LOADING:
      return { ...state, deleteLoading: true }
    case DELETE_STOCK.SUCCESS: {
      const stockListClone = [...state.stockList].filter(
        ({ STOCK_DETAILs }) => STOCK_DETAILs?.id !== payload
      )
      return {
        ...state,
        deleteLoading: false,
        stockList: stockListClone,
      }
    }
    case DELETE_STOCK.CLEAR: {
      return {
        ...state,
        deleteLoading: false,
      }
    }

    case DELETE_STOCK.ERROR:
      return { ...state, deleteLoading: false }

    // STOCK HISTORY
    case GET_STOCK_HISTORY_LIST.LOADING:
      return {
        ...state,
        stockHistoryLoading: true,
      }
    case GET_STOCK_HISTORY_LIST.SUCCESS:
      return {
        ...state,
        stockHistoryLoading: false,
        stockHistoryList: payload.rows,
        stockHistoryTotalCount: payload.total,
      }
    case GET_STOCK_HISTORY_LIST.ERROR:
      return {
        ...state,
        stockHistoryLoading: false,
      }

    // UPDATE STOCK QUANTITY
    case UPDATE_STOCK_QUANTITY.LOADING:
      return {
        ...state,
        updateStockQuantityLoading: true,
      }
    case UPDATE_STOCK_QUANTITY.SUCCESS:
      return {
        ...state,
        updateStockQuantityLoading: false,
      }
    case UPDATE_STOCK_QUANTITY.ERROR:
      return {
        ...state,
        updateStockQuantityLoading: false,
      }

    case SEARCH_STOCK.LOADING:
      return {
        ...state,
        stockSearchListLoading: true,
      }
    case SEARCH_STOCK.SUCCESS:
      return {
        ...state,
        stockSearchList: payload,
        stockSearchListLoading: false,
      }

    case SEARCH_STOCK.ERROR:
      return {
        ...state,
        stockSearchListLoading: false,
      }

    case SEARCHED_HISTORY_LIST.LOADING:
      return {
        ...state,
        searchedHistoryListLoading: true,
      }

    case SEARCHED_HISTORY_LIST.SUCCESS:
      return {
        ...state,
        searchedHistoryListLoading: false,
        searchedHistoryList: payload.rows,
        searchedHistoryListTotal: payload.total,
      }
    case SEARCHED_HISTORY_LIST.ERROR:
      return {
        ...state,
        searchedHistoryListLoading: false,
      }

    default:
      return state
  }
}

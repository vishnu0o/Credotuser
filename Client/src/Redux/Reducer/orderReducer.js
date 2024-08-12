import {
  ORDER_CREATE_ERR,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_FIND_ERR,
  ORDER_FIND_REQUEST,
  ORDER_FIND_SUCCESS,
} from "../Constants/orderContants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        orderCreateLoading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        orderCreateLoading: false,
        orderCreateSuccess: action.payload,
      };
    case ORDER_CREATE_ERR:
      return {
        ...state,
        orderCreateLoading: false,
        orderCreateErr: action.payload,
      };
    default:
      return state;
  }
};



export const orderFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_FIND_REQUEST:
      return {
        ...state,
        orderFindLoading: true,
      };
    case ORDER_FIND_SUCCESS:
      return {
        ...state,
        orderFindLoading: false,
        orderFindSuccess: action.payload,
      };
    case ORDER_FIND_ERR:
      return {
        ...state,
        orderFindLoading: false,
        orderFindErr: action.payload,
      };
    default:
      return state;
  }
};
import {
  CART_CREATE_ERR,
  CART_CREATE_REQUEST,
  CART_CREATE_SUCCESS,
  CART_FIND_ERR,
  CART_FIND_REQUEST,
  CART_FIND_SUCCESS,
  CART_UPDATE_ERR,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
} from "../Constants/cartConstant";

export const cartCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_CREATE_REQUEST:
      return {
        ...state,
        cartCreateLoading: true,
      };
    case CART_CREATE_SUCCESS:
      return {
        ...state,
        cartCreateLoading: false,
        cartCreateSuccess: action.payload,
      };
    case CART_CREATE_ERR:
      return {
        ...state,
        cartCreateLoading: false,
        cartCreateErr: action.payload,
      };
    default:
      return state;
  }
};

  export const cartFindReducer = (state = {}, action) => {
    switch (action.type) {
      case CART_FIND_REQUEST:
        return {
          ...state,
          cartFindLoading: true,
        };
      case CART_FIND_SUCCESS:
        return {
          ...state,
          cartFindLoading: false,
          cartFindSuccess: action.payload,
        };
      case CART_FIND_ERR:
        return {
          ...state,
          cartFindLoading: false,
          cartFindErr: action.payload,
        };
      default:
        return state;
    }
  };
  

  export const cartUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case CART_UPDATE_REQUEST:
        return {
          ...state,
          cartUpdateLoading: true,
        };
      case CART_UPDATE_SUCCESS:
        return {
          ...state,
          cartUpdateLoading: false,
          cartUpdateSuccess: action.payload,
        };
      case CART_UPDATE_ERR:
        return {
          ...state,
          cartUpdateLoading: false,
          cartUpdateErr: action.payload,
        };
      default:
        return state;
    }
  };
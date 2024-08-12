import {
  PRODUCT_FIND_ERR,
  PRODUCT_FIND_REQUEST,
  PRODUCT_FIND_SUCCESS,
  PRODUCT_FINDONE_ERR,
  PRODUCT_FINDONE_REQUEST,
  PRODUCT_FINDONE_SUCCESS,
} from "../Constants/ProductConstant";

export const productFindReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FIND_REQUEST:
      return {
        ...state,
        productFindLoading: true,
      };
    case PRODUCT_FIND_SUCCESS:
      return {
        ...state,
        productFindLoading: false,
        productFindSuccess: action.payload,
      };
    case PRODUCT_FIND_ERR:
      return {
        ...state,
        productFindLoading: false,
        productFindErr: action.payload,
      };
    default:
      return state;
  }
};


export const productFindOneReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FINDONE_REQUEST:
      return {
        ...state,
        productFindOneLoading: true,
      };
    case PRODUCT_FINDONE_SUCCESS:
      return {
        ...state,
        productFindOneLoading: false,
        productFindOneSuccess: action.payload,
      };
    case PRODUCT_FINDONE_ERR:
      return {
        ...state,
        productFindOneLoading: false,
        productFindOneErr: action.payload,
      };
    default:
      return state;
  }
};

import axios from "../../Axios/config";
import {
  PRODUCT_FIND_ERR,
  PRODUCT_FIND_REQUEST,
  PRODUCT_FIND_SUCCESS,
  PRODUCT_FINDONE_ERR,
  PRODUCT_FINDONE_REQUEST,
  PRODUCT_FINDONE_SUCCESS,
} from "../Constants/ProductConstant";

// ProductFind Action

export const ProductFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_FIND_REQUEST });
    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`,
      },
    };
    let { data } = await axios.get("/product/findProduct", config);
    dispatch({ type: PRODUCT_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_FIND_ERR, payload: error.response.data });
  }
};

// ProductFindOne Action

export const ProductFindOneAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_FINDONE_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`,
      },
    };

    let { data } = await axios.get(`/product/findOneProduct?id=${id}`, config);
    dispatch({ type: PRODUCT_FINDONE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_FINDONE_ERR, payload: error.response.data });
  }
};

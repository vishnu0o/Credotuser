import axios from "../../Axios/config";
import {
  ORDER_CREATE_ERR,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_FIND_ERR,
  ORDER_FIND_REQUEST,
  ORDER_FIND_SUCCESS,
} from "../Constants/orderContants";
import {
  PRODUCT_FIND_ERR,
  PRODUCT_FIND_REQUEST,
  PRODUCT_FIND_SUCCESS,
  PRODUCT_FINDONE_ERR,
  PRODUCT_FINDONE_REQUEST,
  PRODUCT_FINDONE_SUCCESS,
} from "../Constants/ProductConstant";

// OrderCreate Action

export const orderCreateAction = (cartData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let Username = isUserExist?.name;
    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`,
      },
    };

    let name = isUserExist?.name;

    let { data } = await axios.post(
      "/order/orderCreate",
      {
        cartData,
        name,
      },
      config
    );
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: ORDER_CREATE_ERR, payload: error.response.data });
  }
};

// OrderFind Action

export const orderFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_FIND_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`,
      },
    };

    let { data } = await axios.get("/order/findOrder", config);

    dispatch({ type: ORDER_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: ORDER_FIND_ERR, payload: error.response.data });
  }
};

import axios from "../../Axios/config";
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

// CartCreate Action

export const cartCreateAction = (id, cartAmount, cartCount) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CART_CREATE_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`,
      },
    };

    let Username = isUserExist?.name;

    let { data } = await axios.post(
      "/cart/addToCart",
      {
        id,
        cartAmount,
        cartCount,
        Username,
      },
      config
    );
    dispatch({ type: CART_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: CART_CREATE_ERR, payload: error.response.data });
  }
};

// CartFind Action

export const cartFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_FIND_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`,
      },
    };
    let Username = isUserExist?.name;

    let { data } = await axios.get("/cart/findCart", config);
    dispatch({ type: CART_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: CART_FIND_ERR, payload: error.response.data });
  }
};

// CartUpdate Action

export const cartUpdateAction = (id, cartAmount, count) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CART_UPDATE_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let Username = isUserExist?.name;
    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`,
      },
    };
    let { data } = await axios.put(
      "/cart/updateCart",
      {
        id,
        cartAmount,
        count,
      },
      config
    );
    dispatch({ type: CART_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: CART_UPDATE_ERR, payload: error.response.data });
  }
};

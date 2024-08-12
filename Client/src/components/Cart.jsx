import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderCreateAction } from "../Redux/Action/orderAction";
import { ORDER_CREATE_SUCCESS } from "../Redux/Constants/orderContants";
import { cartFindAction, cartUpdateAction } from "../Redux/Action/cartAction";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);

  // Reducer
  const { cartFindSuccess } = useSelector((state) => state.cartFind);
  const { orderCreateSuccess } = useSelector((state) => state.orderCreate);
  const { cartUpdateSuccess } = useSelector((state) => state.cartUpdate);

  // Data from local storage

  let isUserExist = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (!isUserExist) {
      navigate("/login");
    }
  }, [isUserExist]);

  // Calculate total cart amount
  const calculateTotal = (cartData) => {
    return cartData.reduce((total, item) => total + item.subTotalPrice, 0);
  };

  // Function to handle increment
  const handleIncrement = (productId) => {
    let newQuantity;
    let newSubtotal;
    const updatedData = data.map((item) => {
      if (item._id === productId) {
        newQuantity = parseInt(item.cartCount) + 1;
        newSubtotal = newQuantity * item.price;
        return { ...item, cartCount: newQuantity, subTotalPrice: newSubtotal };
      }
      return item;
    });
    dispatch(cartUpdateAction(productId, newSubtotal, newQuantity));
    setData(updatedData);
    setCartAmount(calculateTotal(updatedData));
  };

  // Function to handle decrement
  const handleDecrement = (productId) => {
    let newQuantity;
    let newSubtotal;
    const updatedData = data.map((item) => {
      if (item._id === productId && item.cartCount > 1) {
        newQuantity = parseInt(item.cartCount) - 1;
        newSubtotal = newQuantity * item.price;
        return { ...item, cartCount: newQuantity, subTotalPrice: newSubtotal };
      }
      return item;
    });
    dispatch(cartUpdateAction(productId, newSubtotal, newQuantity));
    setData(updatedData);
    setCartAmount(calculateTotal(updatedData));
  };

  useEffect(() => {
    dispatch(cartFindAction());
  }, [dispatch, cartUpdateSuccess]);

  useEffect(() => {
    if (cartFindSuccess) {
      const cartData = cartFindSuccess.data.map((item) => ({
        ...item,
        subTotalPrice: item.price * item.cartCount,
      }));
      setData(cartData);
      setCartAmount(calculateTotal(cartData));
    }
  }, [cartFindSuccess]);

  // Order create success popUp
  useEffect(() => {
    if (orderCreateSuccess) {
      navigate("/success");
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: false });
    }
  }, [orderCreateSuccess, navigate, dispatch]);

  // Handle Checkout

  const handleCheckOut = () => {
    dispatch(orderCreateAction(data));
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 29 }}>
        {/* Cart Header */}
        <Typography variant="h4" sx={{ mb: 3 }}>
          Cart
        </Typography>

        <Grid container spacing={4}>
          {/* Product Table */}
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((value) => (
                    <TableRow key={value._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img
                            src="/cycle1.jpeg"
                            alt={value.productName}
                            style={{ width: 50, height: 50, marginRight: 16 }}
                          />
                          <Typography variant="body1">
                            {value.productName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{value.price}</TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Button onClick={() => handleDecrement(value._id)}>
                            -
                          </Button>
                          <Typography variant="body1" sx={{ mx: 2 }}>
                            {value.cartCount}
                          </Typography>
                          <Button onClick={() => handleIncrement(value._id)}>
                            +
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{value.subTotalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Cart Totals */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cart Totals
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Subtotal</Typography>
                <Typography>INR {cartAmount}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">INR {cartAmount}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckOut}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { orderFindAction } from "../Redux/Action/orderAction";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    orderId: "12345",
    orderDate: "2024-08-12",
    productName: "iPhone 12 Pro Max",
    productImage: "https://via.placeholder.com/100",
    totalPrice: "INR 1,19,900",
    quantity: 2,
  },
  {
    orderId: "12346",
    orderDate: "2024-08-10",
    productName: "MacBook Pro 14",
    productImage: "https://via.placeholder.com/100",
    totalPrice: "INR 1,99,900",
    quantity: 1,
  },
  // Add more orders as needed
];

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Reducer

  let { orderFindSuccess } = useSelector((state) => {
    return state.orderFind;
  });

  // Data from local storage

  let isUserExist = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (!isUserExist) {
      navigate("/login");
    }
  }, [isUserExist]);

  // Handle submit for logout:::::::::::::::::::::::::::::::::::

  const handleLoginSubmit = () => {
    localStorage.removeItem("loginInfo");
    setAnchorElUser(null);
    navigate("/login");
  };

  useEffect(() => {
    dispatch(orderFindAction());
  }, [dispatch]);

  useEffect(() => {
    if (orderFindSuccess) {
      setData(orderFindSuccess?.data);
    }
  }, [orderFindSuccess]);

  // profile handlers
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}
            onClick={() => navigate("/home")}
          >
            DEMO
          </Typography>
          <Box sx={{ mr: 3 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={"/avatar.png"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => navigate("/orders")}
                >
                  My Order
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLoginSubmit}>
                <Typography
                  textAlign="center"
                  // onClick={setting === "Logout" && handleLogout}
                >
                  LogOut
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <IconButton onClick={() => navigate("/cart")} color="inherit">
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          My Orders
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>
                        {new Date(order.orderDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img
                            src={"/cycle2.jpeg"}
                            alt={"productName"}
                            style={{ width: 50, height: 50, marginRight: 16 }}
                          />
                          <Typography variant="body1">
                            {order.ProductName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{order.count}</TableCell>
                      <TableCell align="right">{order.totalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OrdersPage;

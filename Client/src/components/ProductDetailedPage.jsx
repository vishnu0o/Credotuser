import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  Button,
  IconButton,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductFindOneAction } from "../Redux/Action/productAction";
import { cartCreateAction } from "../Redux/Action/cartAction";
import {
  CART_CREATE_ERR,
  CART_CREATE_SUCCESS,
} from "../Redux/Constants/cartConstant";

const ProductDetail = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [addToCart, setAddToCart] = useState(1);
  const [cartAmount, setCartAmount] = useState(data?.price);

  // Reducer

  let { productFindOneSuccess, productFindOneErr } = useSelector((state) => {
    return state.productFindOne;
  });

  let { cartCreateSuccess, cartCreateErr } = useSelector((state) => {
    return state.cartCreate;
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

  useEffect(() => {
    dispatch(ProductFindOneAction(id));
  }, []);

  useEffect(() => {
    if (productFindOneSuccess) {
      setData(productFindOneSuccess?.data);
      setCartAmount(productFindOneSuccess?.data?.price);
    }
  }, [productFindOneSuccess]);

  useEffect(() => {
    if (cartCreateSuccess) {
      Swal.fire("Success", "Item added to cart", "success");
      dispatch({ type: CART_CREATE_SUCCESS, payload: false });
    }
    if (cartCreateErr) {
      Swal.fire("Error", "Item is already in cart", "error");
      dispatch({ type: CART_CREATE_ERR, payload: false });
    }
  }, [cartCreateSuccess, cartCreateErr]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to handle increment

  const handleIncrement = () => {
    const newQuantity = addToCart + 1;
    setAddToCart(newQuantity);
    setCartAmount(newQuantity * data?.price);
  };

  // Function to handle decrement

  const handleDecrement = () => {
    if (addToCart > 1) {
      const newQuantity = addToCart - 1;
      setAddToCart(newQuantity);
      setCartAmount(newQuantity * data?.price);
    }
  };

  return (
    <>
      <div>
        {/* Navbar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography
              variant="h6"
              style={{ flexGrow: 1 }}
              onClick={() => navigate("/home")}
            >
              DEMO
            </Typography>
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <ShoppingCart />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Product Details Section */}
        <Container sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia component="img" image="/cycle1.jpeg" alt="product" />
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {[...Array(3)].map((_, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      image="/cycle2.jpeg"
                      alt="product thumbnail"
                      sx={{ width: "80px", height: "80px", mx: 1 }}
                    />
                  ))}
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {data?.name}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {data?.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                (There are no reviews yet)
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {data?.descriptioin}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Colour:
                </Typography>
                {[
                  "#000000",
                  "#ff4444",
                  "#4caf50",
                  "#2196f3",
                  "#ffeb3b",
                  "#9e9e9e",
                ].map((color, index) => (
                  <Avatar
                    key={index}
                    sx={{ bgcolor: color, mx: 0.5, width: 24, height: 24 }}
                  />
                ))}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <Typography variant="body1">{addToCart}</Typography>
                <Button
                  variant="outlined"
                  sx={{ ml: 2 }}
                  onClick={handleIncrement}
                >
                  +
                </Button>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  dispatch(cartCreateAction(id, cartAmount, addToCart));
                }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Container>

        {/* Tabs for Overview and Specifications */}
        <Container sx={{ mt: 4 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Overview" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography variant="body1">{data?.descriptioin}</Typography>
          </TabPanel>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: "#f8f8f8",
            p: 4,
            mt: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="body1">DEMO</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
            <IconButton>
              <YouTubeIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Terms & Conditions | Privacy Policy | Help & FAQs
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Helpline: 1800 456 84788
            </Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default ProductDetail;

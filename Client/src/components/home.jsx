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
  CardContent,
  CardActions,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import AppleIcon from "@mui/icons-material/Apple"; // Placeholder for brand logos
import RealmeIcon from "@mui/icons-material/PhoneAndroid";
import SonyIcon from "@mui/icons-material/SportsEsports";
import XiaomiIcon from "@mui/icons-material/TabletAndroid";
import SamsungIcon from "@mui/icons-material/Tv";
import LgIcon from "@mui/icons-material/Devices";
import DellIcon from "@mui/icons-material/LaptopMac";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductFindAction } from "../Redux/Action/productAction";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Reducer

  let { productFindSuccess, productFindErr } = useSelector((state) => {
    return state.productFind;
  });

  // Handle submit for logout:::::::::::::::::::::::::::::::::::

  const handleLoginSubmit = () => {
    localStorage.removeItem("loginInfo");
    setAnchorElUser(null);
    navigate("/login");
  };

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
    dispatch(ProductFindAction());
  }, []);

  useEffect(() => {
    if (productFindSuccess) {
      setData(productFindSuccess?.data);
    }
  }, [dispatch, productFindSuccess]);

  // profile handlers
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
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
          <Box sx={{mr:3}}>
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
                  onClick={()=>navigate('/orders')}
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

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url('./banner2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "400px", sm: "500px", md: "600px", lg: "765px" }, // Responsive height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          p: { xs: 2, sm: 4 }, // Responsive padding
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" }, // Responsive font size
            }}
          >
            realme 12x 5G
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }, // Responsive font size
              mb: { xs: 1, sm: 2, md: 3 }, // Responsive margin bottom
            }}
          >
            India's First 45W 5G Phone Under 12K
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" }, // Responsive font size
              px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
              py: { xs: 1, sm: 1.5, md: 2 }, // Responsive padding
            }}
          >
            Notify Me and Win 12x 5G
          </Button>
        </Box>
      </Box>

      {/* Products Section */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card onClick={() => navigate(`/productDetail/${item?._id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image="./cycle1.jpeg"
                  alt="product"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    INR {item?.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Top Brands Section */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Top Brands
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <AppleIcon fontSize="large" />
          <RealmeIcon fontSize="large" />
          <SonyIcon fontSize="large" />
          <XiaomiIcon fontSize="large" />
          <SamsungIcon fontSize="large" />
          <LgIcon fontSize="large" />
          <DellIcon fontSize="large" />
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{ backgroundColor: "#f8f8f8", p: 4, mt: 4, textAlign: "center" }}
      >
        <Typography variant="body1">DEMO</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <IconButton>
            <i className="fab fa-facebook-f"></i>
          </IconButton>
          <IconButton>
            <i className="fab fa-twitter"></i>
          </IconButton>
          <IconButton>
            <i className="fab fa-linkedin-in"></i>
          </IconButton>
          <IconButton>
            <i className="fab fa-youtube"></i>
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
  );
};

export default Home;

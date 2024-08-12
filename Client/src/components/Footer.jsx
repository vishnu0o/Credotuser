import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, YouTube, Phone } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8', py: 4, mt: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Logo Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              DEMO
            </Typography>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              CONNECTED WITH US
            </Typography>
            <Box>
              <IconButton component="a" href="#" aria-label="Facebook" sx={{ color: '#3b5998', mr: 1 }}>
                <Facebook />
              </IconButton>
              <IconButton component="a" href="#" aria-label="Twitter" sx={{ color: '#1DA1F2', mr: 1 }}>
                <Twitter />
              </IconButton>
              <IconButton component="a" href="#" aria-label="LinkedIn" sx={{ color: '#0077b5', mr: 1 }}>
                <LinkedIn />
              </IconButton>
              <IconButton component="a" href="#" aria-label="YouTube" sx={{ color: '#FF0000', mr: 1 }}>
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Important Links */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              IMPORTANT LINKS
            </Typography>
            <Box>
              <Link href="#" underline="none" color="textPrimary" sx={{ mr: 2 }}>
                Terms & Conditions
              </Link>
              <Link href="#" underline="none" color="textPrimary" sx={{ mr: 2 }}>
                Privacy Policy
              </Link>
              <Link href="#" underline="none" color="textPrimary">
                Help & FAQs
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Helpline Section */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="body2" color="textSecondary">
              Arab Deals © 2023. All Rights Reserved
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-end' }} alignItems="center">
              <Phone sx={{ color: '#00a0dc', mr: 1 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Helpline
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  1800 456 84788
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

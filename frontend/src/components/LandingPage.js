// src/components/LandingPage.js
import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Pulse Lunch Order
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Order your favorite meals from our selection of caterers.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          size="large"
        >
          View Menu
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
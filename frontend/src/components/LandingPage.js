
import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container maxWidth="false" sx={{ 
      backgroundImage: 'url(https://as1.ftcdn.net/v2/jpg/02/94/21/86/1000_F_294218600_TshZSaenFbYLA8GhfUw5gJfFAkV6Zz1t.jpg)', 
      backgroundSize: 'contain', 
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh' 
    }}>
      <Box sx={{ 
        mt: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' 
      }}>
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

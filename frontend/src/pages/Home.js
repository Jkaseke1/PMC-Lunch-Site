import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://img.freepik.com/premium-photo/tablet-displaying-grocery-list-with-fresh-produce-table_1259251-940.jpg?w=996')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      position: 'relative'
    }}>
      <Container maxWidth="md" style={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h2" gutterBottom style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Welcome to Pulse Pharmaceuticals Lunch Ordering
        </Typography>
        <Typography variant="h5" gutterBottom style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Delicious meals delivered right to your office
        </Typography>
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: '20px', fontWeight: 'bold' }}
        >
          View Menu
        </Button>
      </Container>
    </div>
  );
};

export default Home;

// src/pages/Menu.js
import React from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import FoodMenu from '../components/FoodMenu';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  backgroundImage: 'url(https://source.unsplash.com/1600x900/?restaurant)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#fff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
}));

const Menu = () => {
  const caterers = [
    {
      name: 'Ruth',
      menu: {
        entrees: [
          { name: 'Beef Stew' },
          { name: 'Chicken Stew' },
          { name: 'Guru Matumbu' },
          { name: 'Smoked Sausage' },
          { name: 'Tbone' },
          { name: 'Gango' },
          { name: 'Roast' },
          { name: 'Mixed Grill' },
          { name: 'Chicken Burger' },
        ],
        starches: [
          { name: 'Chips' },
          { name: 'Wedges' },
          { name: 'Rice' },
          { name: 'Rice Dovi' },
          { name: 'Sadza' },
        ],
        sides: [
          { name: 'Mixed Vegetables' },
          { name: 'Butternut' },
        ],
        desserts: [{ name: 'Fruitpack' }],
      },
    },
    {
      name: 'Makagi',
      menu: {
        entrees: [
          { name: 'Ground Beef with Sausage and Beans' },
          { name: 'Chicken Stew' },
          { name: 'Beef Stew' },
          { name: 'Mixed Grill' },
          { name: 'Chicken Roast' },
          { name: 'Bacon Burger' },
        ],
        starches: [
          { name: 'Spaghetti' },
          { name: 'Chips' },
          { name: 'Rice' },
          { name: 'Peanut Butter Rice' },
          { name: 'Sadza' },
        ],
        sides: [
          { name: 'Coleslaw' },
          { name: 'Mixed Vegetables' },
          { name: 'Leafy Green Vegetables' },
        ],
        desserts: [
          { name: 'Snack Pack (Crackers, Juice & Fruits)' },
          { name: 'Fruitpack (Fruits and Yoghurt)' },
        ],
      },
    },
  ];

  return (
    <StyledBox>
      <Container maxWidth="lg">
        <StyledTitle variant="h2" align="center">
          Our Menu
        </StyledTitle>
        <StyledPaper elevation={3}>
          <Grid container spacing={4}>
            {caterers.map((caterer) => (
              <Grid item xs={12} md={6} key={caterer.name}>
                <FoodMenu caterer={caterer} />
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </Container>
    </StyledBox>
  );
};

export default Menu;
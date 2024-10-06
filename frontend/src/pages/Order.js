import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  useTheme,
  Fade,
  Grow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import OrderForm from '../components/OrderForm';
import { getOrdersByDate, createOrder } from '../services/api';
import { format } from 'date-fns';

const Order = () => {
  const theme = useTheme();
  const [selectedCaterer, setSelectedCaterer] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const caterers = [
    {
      name: 'Ruth',
      image: 'https://img.freepik.com/premium-photo/person-ordering-groceries-online-smartphone_1259251-946.jpg?w=996', 
      menu: {
        entrees: ['Beef Stew', 'Chicken Stew', 'Guru Matumbu', 'Smoked Sausage', 'Tbone', 'Gango', 'Roast', 'Mixed Grill', 'Chicken Burger'],
        starches: ['Chips', 'Wedges', 'Rice', 'Rice Dovi', 'Sadza'],
        sides: ['Mixed Vegetables', 'Butternut'],
        desserts: ['Fruitpack'],
      },
    },
    {
      name: 'Makagi',
      image: 'https://img.freepik.com/premium-photo/smartphone-displaying-grocery-delivery-app-with-various-fruits-vegetables-countertop_1259251-1000.jpg', 
      menu: {
        entrees: ['Ground Beef with Sausage and Beans', 'Chicken Stew', 'Beef Stew', 'Mixed Grill', 'Chicken Roast', 'Bacon Burger'],
        starches: ['Spaghetti', 'Chips', 'Rice', 'Peanut Butter Rice', 'Sadza'],
        sides: ['Coleslaw', 'Mixed Vegetables', 'Leafy Green Vegetables'],
        desserts: ['Snack Pack (Crackers, Juice & Fruits)', 'Fruitpack (Fruits and Yoghurt)'],
      },
    },
  ];

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date().toISOString().split('T')[0];
      const fetchedOrders = await getOrdersByDate(today);
      setUserOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setError('Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSubmit = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      await createOrder(orderData);
      setOrderPlaced(true);
      fetchUserOrders();
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Fade in={true} timeout={1000}>
        <Typography variant="h3" gutterBottom align="center" sx={{
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          mb: 4
        }}>
          Today's Menu
        </Typography>
      </Fade>
     
      <Grid container spacing={4} mb={4}>
        {caterers.map((caterer, index) => (
          <Grow in={true} timeout={(index + 1) * 500} key={index}>
            <Grid item xs={12} sm={6}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={caterer.image}
                  alt={caterer.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {caterer.name}
                  </Typography>
                  <Chip
                    label={`${Object.values(caterer.menu).flat().length} items`}
                    color="primary"
                    size="small"
                  />
                </CardContent>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setSelectedCaterer(caterer)}
                  sx={{
                    mt: 'auto',
                    backgroundColor: theme.palette.secondary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                    }
                  }}
                >
                  Order from {caterer.name}
                </Button>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>

      {selectedCaterer && (
        <Fade in={true} timeout={1000}>
          <Box mt={4} sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              Place Your Order from {selectedCaterer.name}
            </Typography>
            <OrderForm caterer={selectedCaterer} onSubmit={handleOrderSubmit} />
          </Box>
        </Fade>
      )}

      <Box mt={4}>
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Your Order for Today
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : userOrders.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Caterer</TableCell>
                  <TableCell>Entree</TableCell>
                  <TableCell>Starch</TableCell>
                  <TableCell>Side</TableCell>
                  <TableCell>Dessert</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.caterer}</TableCell>
                    <TableCell>{order.entree}</TableCell>
                    <TableCell>{order.starch}</TableCell>
                    <TableCell>{order.side}</TableCell>
                    <TableCell>{order.dessert}</TableCell>
                    <TableCell>{format(new Date(order.orderDate), 'MM/dd/yyyy')}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>You haven't placed an order for today yet.</Typography>
        )}
      </Box>

      {orderPlaced && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Your order has been successfully placed!
        </Alert>
      )}
    </Container>
  );
};

export default Order;
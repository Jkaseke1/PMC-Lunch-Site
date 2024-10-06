import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, TextField, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';

const OrderForm = ({ caterer, onSubmit }) => {
  const [order, setOrder] = useState({
    caterer: caterer.name,
    entree: '',
    starch: '',
    side: '',
    dessert: '',
    orderDate: new Date(),
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setOrder({ ...order, orderDate: newDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(order);
      toast.success('Order submitted successfully');
      setOrder({ ...order, entree: '', starch: '', side: '', dessert: '', orderDate: new Date() });
    } catch (error) {
      toast.error('Failed to submit order');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="entree-label">Entree</InputLabel>
            <Select
              labelId="entree-label"
              name="entree"
              value={order.entree}
              onChange={handleChange}
              required
            >
              {caterer.menu.entrees.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="starch-label">Starch</InputLabel>
            <Select
              labelId="starch-label"
              name="starch"
              value={order.starch}
              onChange={handleChange}
              required
            >
              {caterer.menu.starches.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="side-label">Side</InputLabel>
            <Select
              labelId="side-label"
              name="side"
              value={order.side}
              onChange={handleChange}
              required
            >
              {caterer.menu.sides.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="dessert-label">Dessert</InputLabel>
            <Select
              labelId="dessert-label"
              name="dessert"
              value={order.dessert}
              onChange={handleChange}
              required
            >
              {caterer.menu.desserts.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Order Date"
            value={order.orderDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            disablePast
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit Order
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderForm;

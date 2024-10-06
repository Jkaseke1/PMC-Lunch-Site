import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import { format } from 'date-fns';

const OrderList = ({ orders }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" style={{ padding: '16px' }}>
        Recent Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Caterer</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.user.email}</TableCell>
              <TableCell>{order.caterer}</TableCell>
              <TableCell>
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} ({item.category})
                    {index < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </TableCell>
              <TableCell>{format(new Date(order.orderDate), 'MM/dd/yyyy')}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;

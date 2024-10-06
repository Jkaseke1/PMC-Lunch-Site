// src/components/DailyOrders.js
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

const DailyOrders = ({ orders }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Caterer</TableCell>
            <TableCell>Entree</TableCell>
            <TableCell>Starch</TableCell>
            <TableCell>Side</TableCell>
            <TableCell>Dessert</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.caterer}</TableCell>
              <TableCell>{order.entree}</TableCell>
              <TableCell>{order.starch}</TableCell>
              <TableCell>{order.side}</TableCell>
              <TableCell>{order.dessert}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DailyOrders;

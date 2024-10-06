import React from 'react';
import { Container, Typography } from '@material-ui/core';
import AdminPanel from '../components/AdminPanel';

const Admin = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Admin Panel
      </Typography>
      <AdminPanel />
    </Container>
  );
};

export default Admin;

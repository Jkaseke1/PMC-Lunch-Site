import React from 'react';
import { Typography, Container, Link } from '@material-ui/core';

const Footer = () => {
  return (
    <footer style={{ marginTop: 'auto', padding: '20px 0', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Pulse Pharmaceuticals. All rights reserved.
          <br />
          <Link color="inherit" href="https://pulse-pharmaceuticals.co.zw/">
            Visit our website
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
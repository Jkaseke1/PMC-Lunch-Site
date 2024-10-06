import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f8f8f8',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
}));

const MenuSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const FoodMenu = ({ caterer }) => {
  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        {caterer.name}'s Menu
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {Object.entries(caterer.menu).map(([category, items]) => (
        <MenuSection key={category}>
          <SectionTitle variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)}</SectionTitle>
          <List disablePadding>
            {items.map((item, index) => (
              <React.Fragment key={item.name}>
                <StyledListItem>
                  <ListItemText primary={item.name} />
                </StyledListItem>
                {index < items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </MenuSection>
      ))}
    </StyledPaper>
  );
};

export default FoodMenu;

import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import {
  getAllOrders,
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  generateReport,
  checkAdminStatus,
  updateOrderStatus
} from '../services/api';
import { generatePDF, generateExcel } from '../utils/reports';

const AdminPanel = () => {
  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reportType, setReportType] = useState('pdf');
  const [reportPeriod, setReportPeriod] = useState('daily');
  const [selectedCategory, setSelectedCategory] = useState('entree');

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      setIsLoading(true);
      const { isAdmin } = await checkAdminStatus();
      setIsAdmin(isAdmin);
      if (isAdmin) {
        await Promise.all([fetchOrders(), fetchMenuItems()]);
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      setSnackbar({ open: true, message: 'Failed to verify admin access', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setSnackbar({ open: true, message: 'Failed to fetch orders', severity: 'error' });
    }
  };

  const fetchMenuItems = async () => {
    try {
      const fetchedMenuItems = await getMenuItems();
      setMenuItems(fetchedMenuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setSnackbar({ open: true, message: 'Failed to fetch menu items', severity: 'error' });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddMenuItem = async () => {
    try {
      const newItem = {
        name: 'New Item',
        category: selectedCategory,
        caterer: 'Ruth', // Default caterer, can be modified as needed
        price: 0
      };
      await addMenuItem(newItem);
      await fetchMenuItems();
      setSnackbar({ open: true, message: 'New menu item added successfully', severity: 'success' });
    } catch (error) {
      console.error('Error adding menu item:', error);
      setSnackbar({ open: true, message: 'Failed to add new menu item', severity: 'error' });
    }
  };

  const handleEditMenuItem = (item) => {
    setEditingItem(item);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingItem(null);
  };

  const handleSaveMenuItem = async () => {
    try {
      await updateMenuItem(editingItem._id, editingItem);
      await fetchMenuItems();
      handleCloseEditDialog();
      setSnackbar({ open: true, message: 'Menu item updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error editing menu item:', error);
      setSnackbar({ open: true, message: 'Failed to update menu item', severity: 'error' });
    }
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await deleteMenuItem(id);
      await fetchMenuItems();
      setSnackbar({ open: true, message: 'Menu item deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setSnackbar({ open: true, message: 'Failed to delete menu item', severity: 'error' });
    }
  };

  const handleGenerateReport = async () => {
    try {
      const endDate = new Date();
      let startDate = new Date();
      
      if (reportPeriod === 'daily') {
        startDate.setDate(endDate.getDate() - 1);
      } else if (reportPeriod === 'weekly') {
        startDate.setDate(endDate.getDate() - 7);
      } else if (reportPeriod === 'monthly') {
        startDate.setMonth(endDate.getMonth() - 1);
      }

      const reportData = await generateReport(startDate.toISOString(), endDate.toISOString());
      
      if (reportType === 'pdf') {
        generatePDF(reportData);
      } else {
        generateExcel(reportData);
      }
      setSnackbar({ open: true, message: 'Report generated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error generating report:', error);
      setSnackbar({ open: true, message: 'Failed to generate report', severity: 'error' });
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await fetchOrders();
      setSnackbar({ open: true, message: 'Order status updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating order status:', error);
      setSnackbar({ open: true, message: 'Failed to update order status', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAdmin) {
    return <Typography variant="h6">You do not have admin access.</Typography>;
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Menu Management" />
        <Tab label="Orders" />
        <Tab label="Reports" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="h6">Menu Items</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              fetchMenuItems(); // Fetch menu items when category changes
            }}
          >
            <MenuItem value="entree">Entree</MenuItem>
            <MenuItem value="starch">Starch</MenuItem>
            <MenuItem value="side">Side</MenuItem>
            <MenuItem value="dessert">Dessert</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu</Typography>
        <List>
          {menuItems && menuItems
            .filter(item => item.category === selectedCategory)
            .map((item) => (
              <ListItem key={item._id}>
                <ListItemText primary={item.name} secondary={`$${item.price}`} />
                <Button onClick={() => handleEditMenuItem(item)}>Edit</Button>
                <Button onClick={() => handleDeleteMenuItem(item._id)}>Delete</Button>
              </ListItem>
            ))}
        </List>
        <Button onClick={handleAddMenuItem}>
          Add New {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Item
        </Button>
        
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Menu Item</DialogTitle>
          <DialogContent>
            {editingItem && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  >
                    <MenuItem value="entree">Entree</MenuItem>
                    <MenuItem value="starch">Starch</MenuItem>
                    <MenuItem value="side">Side</MenuItem>
                    <MenuItem value="dessert">Dessert</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Caterer</InputLabel>
                  <Select
                    value={editingItem.caterer}
                    onChange={(e) => setEditingItem({ ...editingItem, caterer: e.target.value })}
                  >
                    <MenuItem value="Ruth">Ruth</MenuItem>
                    <MenuItem value="Makagi">Makagi</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="dense"
                  label="Price"
                  type="number"
                  fullWidth
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleSaveMenuItem}>Save</Button>
          </DialogActions>
        </Dialog>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6">Orders</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username/Email</TableCell>
                <TableCell>Ordered Food</TableCell>
                <TableCell>Caterer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.user?.email}</TableCell>
                  <TableCell>{`${order.entree}, ${order.starch}, ${order.side}, ${order.dessert}`}</TableCell>
                  <TableCell>{order.caterer}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6">Generate Reports</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Report Type</InputLabel>
          <Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="excel">Excel</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Report Period</InputLabel>
          <Select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleGenerateReport} variant="contained" color="primary">
          Generate Report
        </Button>
      </TabPanel>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default AdminPanel;
const express = require('express');
const { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', auth, addMenuItem);
router.put('/:id', auth, updateMenuItem);
router.delete('/:id', auth, deleteMenuItem);

module.exports = router;

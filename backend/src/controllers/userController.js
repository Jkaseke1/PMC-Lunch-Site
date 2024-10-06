const User = require('../models/User');

exports.checkAdminStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ message: 'Error checking admin status', error: error.message });
  }
};

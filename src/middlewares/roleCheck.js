const { User } = require('../models'); // Assuming you have a User model

function roleCheck(roles) {
  return async function (req, res, next) {
    try {
      const userId = req.headers['x-user-id'];
      if (!userId) {
        return res.status(400).json({ message: 'User ID header missing.' });
      }

      // Fetch user from database
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Attach user to request
      req.user = user;

      const userRole = req.user ? req.user.role : null;
      if (!userRole) {
        return res
          .status(400)
          .json({ message: 'Role not found in user data.' });
      }

      if (!roles.includes(userRole)) {
        return res
          .status(403)
          .json({ message: 'Access forbidden: insufficient role.' });
      }

      next();
    } catch (error) {
      console.error('Error in roleCheck middleware:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
}

module.exports = roleCheck;

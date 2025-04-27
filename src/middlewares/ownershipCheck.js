const { Lead } = require('../models');

// Ownership Check middleware (Sales agents can only update their own leads)
function ownershipCheck() {
  return async function (req, res, next) {
    try {
      const userId = req.headers['x-user-id'];
      if (!userId) {
        return res.status(400).json({ message: 'User ID header missing.' });
      }

      const { leadId } = req.params; // Lead ID passed in the route params

      // Fetch the lead from the database
      const lead = await Lead.findByPk(leadId);
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found.' });
      }

      // If user is a sales agent, check if they are the assigned agent
      if (
        req.user.role === 'sales_agent' &&
        lead.assigned_sales_agent_id != userId
      ) {
        return res
          .status(403)
          .json({ message: 'You are not authorized to update this lead.' });
      }

      // If user is an admin or the owner, allow them to proceed
      next();
    } catch (error) {
      console.error('Error in ownershipCheck middleware:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
}

module.exports = ownershipCheck;

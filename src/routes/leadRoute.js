const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const leadDetailsController = require('../controllers/leadDetailsController');

const {
  validateLeadCreation,
  validateLeadAssignment,
} = require('../middlewares/validations/leadValidation');
const roleCheck = require('../middlewares/roleCheck');
const {
  handleValidationErrors,
} = require('../middlewares/validationErrorHandler');
const {
  validateLeadDetails,
} = require('../middlewares/validations/leadDetailsValidation');
const ownershipCheck = require('../middlewares/ownershipCheck');

// Route for creating leads (public)
router.post(
  '/',
  validateLeadCreation,
  handleValidationErrors,
  leadController.createLead
);

// Route for assigning leads (Admins only)
router.post(
  '/:leadId/assign',
  roleCheck(['admin']), // First: is the user allowed
  validateLeadAssignment, // then validate
  handleValidationErrors,
  leadController.assignLead
);

// Route: Update or create lead details
router.put(
  '/:leadId/details',
  roleCheck(['sales_agent']),
  ownershipCheck(),
  validateLeadDetails,
  handleValidationErrors,
  leadDetailsController.recordLeadDetails
);

module.exports = router;

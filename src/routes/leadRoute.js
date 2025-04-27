const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const {
  validateLeadCreation,
  validateLeadAssignment,
} = require('../middlewares/validations/leadValidation');
const roleCheck = require('../middlewares/roleCheck');
const {
  handleValidationErrors,
} = require('../middlewares/validationErrorHandler');

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

module.exports = router;

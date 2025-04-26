const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const {
  validateLeadCreation,
  handleValidationErrors,
} = require('../middlewares/validations/leadValidation');
const roleCheck = require('../middlewares/roleCheck');

// Route for creating leads (public)
router.post(
  '/',
  validateLeadCreation,
  handleValidationErrors,
  leadController.createLead
);

// Route for assigning leads (Admins only)
router.post('/:leadId/assign', roleCheck(['admin']), leadController.assignLead);

module.exports = router;

const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const {
  validateLeadCreation,
  handleValidationErrors,
} = require('../middlewares/validations/leadValidation');

// Route for creating leads (public)
router.post(
  '/',
  validateLeadCreation,
  handleValidationErrors,
  leadController.createLead
);

module.exports = router;

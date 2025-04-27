const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');

const roleCheck = require('../middlewares/roleCheck');
const ownershipCheck = require('../middlewares/ownershipCheck');
const {
  validateReservationCreation,
} = require('../middlewares/validations/reservationValidation');
const {
  handleValidationErrors,
} = require('../middlewares/validationErrorHandler');

// Route: Create a Reservation
router.post(
  '/:leadId',
  roleCheck(['sales_agent']), // Only sales agents can create reservations
  ownershipCheck(), // Ensure the agent owns the lead
  validateReservationCreation, // Validate reservation fields
  handleValidationErrors, // Catch and handle validation errors
  reservationController.createReservation
);

module.exports = router;

const { body } = require('express-validator');
const {
  numberField,
  dateField,
  requiredField,
} = require('../../constants/vaidationMessages');

const validateReservationCreation = [
  body('property_id').isInt().withMessage(numberField('Property ID')),
  body('reservation_date')
    .isISO8601()
    .withMessage(dateField('Reservation date')),
  body('reservation_fee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage(numberField('Reservation fee')),
  body('expected_closing_date')
    .notEmpty()
    .withMessage(requiredField('Expected closing date'))
    .isISO8601()
    .withMessage(dateField('Expected closing date')),
];

module.exports = {
  validateReservationCreation,
};

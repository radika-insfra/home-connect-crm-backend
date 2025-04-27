const { body, param } = require('express-validator');
const {
  stringField,
  requiredField,
  numberField,
} = require('../../constants/vaidationMessages');

// Validate Lead Details Creation or Update
const validateLeadDetails = [
  param('leadId')
    .isInt()
    .withMessage(numberField('Lead ID'))
    .notEmpty()
    .withMessage(requiredField('Lead ID')),

  body('budget_min')
    .optional()
    .isDecimal()
    .withMessage(numberField('Minimum Budget')),

  body('budget_max')
    .optional()
    .isDecimal()
    .withMessage(numberField('Maximum Budget')),

  body('preferred_property_type')
    .optional()
    .isString()
    .withMessage(stringField('Preferred Property Type')),
];

module.exports = {
  validateLeadDetails,
};

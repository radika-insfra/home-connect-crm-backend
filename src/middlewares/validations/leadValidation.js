const { body, param } = require('express-validator');
const {
  stringField,
  requiredField,
  emailInvalid,
  emailRequired,
  dateField,
  numberField,
} = require('../../constants/vaidationMessages');

// Validate Lead Creation
const validateLeadCreation = [
  body('name')
    .isString()
    .withMessage(stringField('Lead name'))
    .notEmpty()
    .withMessage(requiredField('Lead name')),

  body('email')
    .isEmail()
    .withMessage(emailInvalid('Lead'))
    .notEmpty()
    .withMessage(emailRequired('Lead')),

  body('phone').optional().isString().withMessage(stringField('Lead phone')),

  body('source')
    .isString()
    .withMessage(stringField('Lead Source'))
    .notEmpty()
    .withMessage(requiredField('Lead Source')),

  body('inquiry_date')
    .isISO8601()
    .withMessage(dateField('Lead inquiry date'))
    .notEmpty()
    .withMessage(requiredField('Lead inquiry date')),
];

// Validate Lead Assignment
const validateLeadAssignment = [
  param('leadId')
    .isInt()
    .withMessage(numberField('Lead ID'))
    .notEmpty()
    .withMessage(requiredField('Lead ID')),

  body('salesAgentId')
    .isInt()
    .withMessage(numberField('Sales Agent ID'))
    .notEmpty()
    .withMessage(requiredField('Sales Agent ID')),
];

module.exports = {
  validateLeadCreation,
  validateLeadAssignment,
};

const { body, validationResult } = require('express-validator');
const {
  stringField,
  requiredField,
  emailInvalid,
  emailRequired,
  dateField,
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

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateLeadCreation,
  handleValidationErrors,
};

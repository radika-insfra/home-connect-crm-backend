const { body, param } = require('express-validator');
const {
  stringField,
  requiredField,
  numberField,
  arrayRequired,
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

  body('locations')
    .optional()
    .isArray()
    .withMessage(arrayRequired['Locations'])
    .custom((locations) => {
      if (Array.isArray(locations)) {
        locations.forEach((location) => {
          if (typeof location !== 'string' || location.trim() === '') {
            throw new Error('Each location must be a non-empty string.');
          }
        });
      } else if (locations !== undefined) {
        // If it's neither a string nor an array, throw an error
        throw new Error('Locations must be an array or a string.');
      }

      return true;
    }),
];

module.exports = {
  validateLeadDetails,
};

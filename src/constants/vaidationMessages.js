module.exports = {
  // General
  requiredField: (field) => `${field} is required.`,
  invalidField: (field) => `${field} is invalid.`,

  stringField: (field) => `${field} must be a valid string.`,
  numberField: (field) => `${field} must be a valid number.`,
  dateField: (field) => `${field} must be a valid date (YYYY-MM-DD).`,
  booleanField: (field) => `${field} must be a boolean value.`,

  // Email
  emailRequired: (entity) => `${entity} email is required.`,
  emailInvalid: (entity) => `${entity} email must be a valid email address.`,

  // Role
  roleRequired: () => `User role is required.`,
  roleInvalid: () =>
    `User role must be one of: admin, sales_agent, finance, legal.`,

  // Status
  leadStatusInvalid: () =>
    `Lead status must be one of: unassigned, assigned, reservation, financial_approve, legal_finalized, property_sold.`,
  followUpTypeInvalid: () => `Follow up type must be either "email" or "call".`,
  financialStatusInvalid: () =>
    `Financial status must be either "approved" or "rejected".`,

  // Others
  interestLevelInvalid: () =>
    `Interest level must be a number between 1 and 10.`,
};

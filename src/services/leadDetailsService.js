const { LeadDetails } = require('../models');

async function create(leadId, preferredPropertyType, options) {
  const { transaction } = options || {};
  try {
    const leadDetails = await LeadDetails.create(
      {
        lead_id: leadId, // Link to the created lead
        preferred_property_type: preferredPropertyType, // Only this field is passed at creation
        is_active: true, // Default to active
      },
      {
        transaction,
      }
    );

    return leadDetails;
  } catch (error) {
    console.error('Error creating lead details:', error);
    throw new Error('Error creating lead details: ' + error.message);
  }
}

module.exports = {
  create,
};

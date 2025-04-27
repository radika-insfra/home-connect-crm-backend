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

async function createOrUpdate(
  leadId,
  budget_min,
  budget_max,
  preferred_property_type,
  options = {}
) {
  try {
    // First, check if lead details already exist for the given leadId
    const existingLeadDetails = await LeadDetails.findOne({
      where: { lead_id: leadId },
      transaction: options.transaction,
    });

    if (existingLeadDetails) {
      // If found, update the existing record
      existingLeadDetails.budget_min = budget_min;
      existingLeadDetails.budget_max = budget_max;
      existingLeadDetails.preferred_property_type = preferred_property_type;

      await existingLeadDetails.save({ transaction: options.transaction });

      return existingLeadDetails;
    } else {
      // If not found, create a new lead details record
      const newLeadDetails = await LeadDetails.create(
        {
          lead_id: leadId,
          budget_min,
          budget_max,
          preferred_property_type,
        },
        { transaction: options.transaction }
      );

      return newLeadDetails;
    }
  } catch (error) {
    console.error('Error in createOrUpdate lead details:', error);
    throw error;
  }
}

module.exports = {
  create,
  createOrUpdate,
};

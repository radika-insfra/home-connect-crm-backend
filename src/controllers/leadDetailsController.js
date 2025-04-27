const leadDetailsService = require('../services/leadDetailsService');
const sequelize = require('../config/db');
const leadLocationPreferencesService = require('../services/locationPreferencesService');

async function recordLeadDetails(req, res) {
  const { leadId } = req.params; // Get lead ID from URL parameter
  const { budget_min, budget_max, preferred_property_type, locations } =
    req.body; // Extract fields from request body

  const t = await sequelize.transaction(); // Start a transaction

  try {
    // Step 1: Create or update the lead details (Budget, Property Type)
    const leadDetails = await leadDetailsService.createOrUpdate(
      leadId,
      budget_min,
      budget_max,
      preferred_property_type,
      { transaction: t } // Pass transaction to maintain atomicity
    );

    // Step 2: Create location preferences if provided
    let createdLocations = [];
    if (locations && locations.length > 0) {
      createdLocations = await leadLocationPreferencesService.create(
        leadDetails.id,
        locations,
        {
          transaction: t,
        }
      );
    }

    await t.commit();

    res.status(200).json({
      message: 'Lead details recorded successfully.',
      lead_details: leadDetails,
      createdLocations: createdLocations,
    });
  } catch (error) {
    // Rollback transaction if any step fails
    await t.rollback();
    console.error('Error recording lead details:', error);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  recordLeadDetails,
};

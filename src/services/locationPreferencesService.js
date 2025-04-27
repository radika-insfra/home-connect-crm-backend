const { LocationPreferences, LeadDetails } = require('../models');

async function create(leadDetailsId, locations, options) {
  const { transaction } = options || {};
  const addedLocations = []; // This will store the locations added

  try {
    // Ensure the transaction is passed correctly
    const leadDetail = await LeadDetails.findByPk(leadDetailsId);
    if (!leadDetail) {
      throw new Error(`LeadDetails with id ${leadDetailsId} not found`);
    }

    // Create locations one by one, but check for duplicates before inserting
    for (let location of locations) {
      const existingLocation = await LocationPreferences.findOne({
        where: {
          lead_details_id: leadDetailsId,
          location: location,
        },
        transaction,
      });

      if (!existingLocation) {
        // If location doesn't exist, insert it
        await LocationPreferences.create(
          {
            lead_details_id: leadDetailsId,
            location: location,
          },
          { transaction } // Using the transaction here
        );
        console.log(`Location ${location} added successfully`);
        addedLocations.push(location); // Add the location to the list
      } else {
        console.log(`Location ${location} already exists, skipping.`);
      }
    }

    // Return the added locations (newly added locations)
    const returnedLocations = await LocationPreferences.findAll({
      where: {
        lead_details_id: leadDetailsId,
        location: addedLocations, // Get the newly added locations
      },
      transaction,
    });

    // Return the locations after they are inserted or found
    return returnedLocations.map((loc) => loc.location); // Just return the location names
  } catch (error) {
    console.error('Error adding locations:', error.message);
    if (transaction) {
      await transaction.rollback(); // Rollback if an error occurs
    }
    throw error; // Re-throw the error so that it can be handled by the caller
  }
}

module.exports = {
  create,
};

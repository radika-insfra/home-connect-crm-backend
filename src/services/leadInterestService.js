const { Property, LeadInterest } = require('../models');

async function create(leadDetailsId, propertyInterests, { transaction }) {
  const updatedInterests = []; // To collect updated or created interests
  try {
    // Loop over the array of property interests and insert each one
    for (const { property_id, interest_level } of propertyInterests) {
      // Validate property_id existence
      const propertyExists = await Property.findByPk(property_id); // Check if the property exists
      if (!propertyExists) {
        throw new Error(`Property with ID ${property_id} does not exist.`);
      }

      // Validate interest_level
      if (
        typeof interest_level !== 'number' ||
        interest_level < 1 ||
        interest_level > 10
      ) {
        throw new Error('Interest level must be between 1 and 10.');
      }

      // Use upsert to either update or create the property interest
      const [leadInterest] = await LeadInterest.upsert(
        {
          lead_details_id: leadDetailsId, // Linking to the lead_details table
          property_id: property_id, // Property ID
          interest_level: interest_level, // Interest level
        },
        {
          transaction, // Using the transaction here for atomicity
          conflictFields: ['lead_details_id', 'property_id'], // Specify unique keys for conflict resolution
          returning: true, // Ensure we get the updated or created record
        }
      );

      // Add the updated or created record to the results array
      updatedInterests.push(leadInterest);
    }

    console.log('Property interests added/updated successfully');

    // Return the updated or created interests
    return updatedInterests;
  } catch (error) {
    console.error('Error adding/updating property interests:', error.message);
    throw error; // Re-throwing the error to be handled by the controller
  }
}

module.exports = {
  create,
};

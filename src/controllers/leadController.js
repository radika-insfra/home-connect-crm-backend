const leadService = require('../services/leadService');
const leadDetailsService = require('../services/leadDetailsService');
const sequelize = require('../config/db');

async function createLead(req, res) {
  const { name, email, phone, source, inquiry_date, preferred_property_type } =
    req.body;

  const t = await sequelize.transaction(); // Start a transaction to ensure atomicity

  try {
    // Step 1: Create the lead record
    const newLead = await leadService.create(
      name,
      email,
      phone,
      source,
      inquiry_date,
      { transaction: t } // Pass transaction here to keep it consistent
    );

    // Step 2: Create the lead_details record
    // In case preferred_property_type is not provided, it defaults to null
    const leadDetails = await leadDetailsService.create(
      newLead.id, // Link lead details to the created lead
      preferred_property_type || null, // If not provided, it will be null
      { transaction: t } // Ensure the transaction is applied here too
    );

    // Step 3: Commit the transaction if both operations succeed
    await t.commit();

    res.status(201).json({
      message: 'Lead and details created successfully.',
      lead: newLead,
      lead_details: leadDetails,
    });
  } catch (error) {
    // Rollback the transaction if something goes wrong
    await t.rollback();
    console.error('Error creating lead and details:', error);
    res.status(400).json({ message: error.message });
  }
}

async function assignLead(req, res) {
  const t = await sequelize.transaction(); // Start a transaction to ensure atomicity
  try {
    const { leadId } = req.params; // Send lead id in the URL

    if (!req.body || !req.body.salesAgentId) {
      return res
        .status(400)
        .json({ message: 'Sales Agent ID is required in the request body.' });
    }

    const { salesAgentId } = req.body;

    const updatedLead = await leadService.assign(leadId, salesAgentId, {
      transaction: t,
    });

    res
      .status(200)
      .json({ message: 'Lead assigned successfully.', lead: updatedLead });
  } catch (error) {
    console.error('Error assigning lead:', error);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createLead,
  assignLead,
};

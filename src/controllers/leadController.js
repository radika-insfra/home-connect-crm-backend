const leadService = require('../services/leadService');

async function createLead(req, res) {
  try {
    const { name, email, phone, source, inquiry_date } = req.body;

    const newLead = await leadService.createLead(
      name,
      email,
      phone,
      source,
      inquiry_date
    );
    res
      .status(201)
      .json({ message: 'Lead created successfully.', lead: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(400).json({ message: error.message });
  }
}

async function assignLead(req, res) {
  try {
    const { leadId } = req.params; // Send lead id in the URL

    if (!req.body || !req.body.salesAgentId) {
      return res
        .status(400)
        .json({ message: 'Sales Agent ID is required in the request body.' });
    }

    const { salesAgentId } = req.body;

    const updatedLead = await leadService.assignLead(leadId, salesAgentId);

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

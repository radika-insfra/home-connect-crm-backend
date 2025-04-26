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

module.exports = {
  createLead,
};

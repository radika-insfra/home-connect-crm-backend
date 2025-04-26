const { Lead } = require('../models');

async function createLead(name, email, phone, source, inquiry_date) {
  // Check if email already exists
  const existingLead = await Lead.findOne({ where: { email } });
  if (existingLead) {
    throw new Error('Lead with this email already exists.');
  }

  // Create the lead
  const newLead = await Lead.create({
    name,
    email,
    phone,
    source,
    inquiry_date,
    status: 'unassigned',
  });

  return newLead;
}

module.exports = {
  createLead,
};

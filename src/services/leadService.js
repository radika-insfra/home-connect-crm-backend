const { Lead, User } = require('../models');
const sequelize = require('../config/db');

async function createLead(
  name,
  email,
  phone,
  source,
  inquiry_date,
  transaction
) {
  // Check if email already exists
  const existingLead = await Lead.findOne({ where: { email } });
  if (existingLead) {
    throw new Error('Lead with this email already exists.');
  }

  // Create the lead
  const newLead = await Lead.create(
    {
      name,
      email,
      phone,
      source,
      inquiry_date,
      status: 'unassigned',
    },
    { transaction }
  );

  return newLead;
}

async function assignLead(leadId, salesAgentId) {
  // Start a transaction
  const t = await sequelize.transaction();

  try {
    // Check if lead exists
    const lead = await Lead.findByPk(leadId);
    if (!lead) {
      throw new Error('Lead not found.');
    }

    // Validate if sales agent exists
    const salesAgent = await User.findByPk(salesAgentId);
    if (!salesAgent || salesAgent.role !== 'sales_agent') {
      throw new Error('Sales agent not found or invalid role.');
    }

    // Only unassigned leads can be assigned
    if (lead.status !== 'unassigned') {
      throw new Error('Only unassigned leads can be assigned.');
    }

    // Update the lead with assigned agent and status change
    lead.assigned_sales_agent_id = salesAgentId;
    lead.status = 'assigned';

    // Save the lead inside the transaction
    await lead.save({ transaction: t });

    // Commit the transaction
    await t.commit();

    return lead;
  } catch (error) {
    // If anything fails, roll back the transaction
    await t.rollback();
    throw error;
  }
}

module.exports = {
  createLead,
  assignLead,
};

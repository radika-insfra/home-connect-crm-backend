// main index for models
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Lead = require('./lead')(sequelize, Sequelize.DataTypes);
const LeadDetails = require('./leadDetails')(sequelize, Sequelize.DataTypes);
const LocationPreferences = require('./leadLocationPreferences')(
  sequelize,
  Sequelize.DataTypes
);
const FollowUpStatus = require('./followUpStatus')(
  sequelize,
  Sequelize.DataTypes
);
const Property = require('./property')(sequelize, Sequelize.DataTypes);
const LeadInterest = require('./leadInterest')(sequelize, Sequelize.DataTypes);
const Reservation = require('./reservation')(sequelize, Sequelize.DataTypes);
const FinancialStatus = require('./financialStatus')(
  sequelize,
  Sequelize.DataTypes
);
const LegalStatus = require('./legalStatus')(sequelize, Sequelize.DataTypes);
const SaleStatus = require('./saleStatus')(sequelize, Sequelize.DataTypes);

// Associations

// Lead assigned to a User (sales agent)
Lead.belongsTo(User, {
  foreignKey: 'assigned_sales_agent_id',
  as: 'assignedSalesAgent',
});

// Lead has one LeadDetails
Lead.hasOne(LeadDetails, { foreignKey: 'lead_id', as: 'lead_details' });

// LeadDetails belong to Lead
LeadDetails.belongsTo(Lead, { foreignKey: 'lead_id' });

// LeadLocationPreferences belong to LeadDetails
LocationPreferences.belongsTo(LeadDetails, {
  foreignKey: 'lead_details_id',
});

// FollowUpStatus belong to LeadDetails
FollowUpStatus.belongsTo(LeadDetails, { foreignKey: 'lead_details_id' });

// LeadInterest belongs to LeadDetails
LeadInterest.belongsTo(LeadDetails, { foreignKey: 'lead_details_id' });

// LeadInterest belongs to Property
LeadInterest.belongsTo(Property, { foreignKey: 'property_id' });

// Reservation belongs to LeadDetails
Reservation.belongsTo(LeadDetails, { foreignKey: 'lead_details_id' });

// Reservation belongs to Property
Reservation.belongsTo(Property, { foreignKey: 'property_id' });

// FinancialStatus belongs to Reservation
FinancialStatus.belongsTo(Reservation, { foreignKey: 'reservation_id' });

// FinancialStatus belongs to User (finance user)
FinancialStatus.belongsTo(User, {
  foreignKey: 'finance_user_id',
  as: 'financeUser',
});

// LegalStatus belongs to Reservation
LegalStatus.belongsTo(Reservation, { foreignKey: 'reservation_id' });

// LegalStatus belongs to User (legal user)
LegalStatus.belongsTo(User, { foreignKey: 'legal_user_id', as: 'legalUser' });

// SaleStatus belongs to Reservation
SaleStatus.belongsTo(Reservation, { foreignKey: 'reservation_id' });

const db = {
  sequelize,
  User,
  Lead,
  LeadDetails,
  LocationPreferences,
  FollowUpStatus,
  Property,
  LeadInterest,
  Reservation,
  FinancialStatus,
  LegalStatus,
  SaleStatus,
};

module.exports = db;

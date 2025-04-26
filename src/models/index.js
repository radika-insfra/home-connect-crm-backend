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

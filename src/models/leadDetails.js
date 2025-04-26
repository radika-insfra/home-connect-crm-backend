module.exports = (sequelize, DataTypes) => {
  const LeadDetails = sequelize.define(
    'lead_details',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      budget_min: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true, // Optional field
      },
      budget_max: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true, // Optional field
      },
      preferred_property_type: {
        type: DataTypes.STRING(255),
        allowNull: true, // Optional field in the lead creation, updated in the assign stage
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Default to true
      },
      cancellation_reason: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional field
      },
      lead_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Required field, must link to a lead
        references: {
          model: 'lead',
          key: 'id',
        },
        onDelete: 'CASCADE', // If lead is deleted, delete lead_details
      },
    },
    {
      tableName: 'lead_details',
      underscored: true,
      timestamps: true, // Automatically adds created_at and updated_at
    }
  );

  return LeadDetails;
};

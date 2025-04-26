module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define(
    'Lead',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Name is required for every lead
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false, // Email is required and must be unique
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true, // Optional, may be null if not provided
      },
      source: {
        type: DataTypes.STRING(100),
        allowNull: false, // Source of the lead must be provided
      },
      inquiry_date: {
        type: DataTypes.DATE,
        allowNull: false, // Inquiry date is required to track when the lead was created
      },
      status: {
        type: DataTypes.ENUM(
          'unassigned',
          'assigned',
          'reservation',
          'financial_approved',
          'legal_finalized',
          'property_sold',
          'cancelled'
        ),
        allowNull: false, // Status is required to track the lead's progress
        defaultValue: 'unassigned', // when creation time
      },
      assigned_sales_agent_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assigned user can be null if the lead is unassigned
      },
    },
    {
      tableName: 'lead',
      underscored: true,
      timestamps: true, // Automatically includes created_at and updated_at fields
    }
  );

  return Lead;
};

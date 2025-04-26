module.exports = (sequelize, DataTypes) => {
  const LeadLocationPreference = sequelize.define(
    'lead_location_preferences',
    {
      lead_details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'lead_details',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: 'lead_location_preferences',
      underscored: true,
      timestamps: false,
    }
  );

  return LeadLocationPreference;
};

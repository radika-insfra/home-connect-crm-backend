module.exports = (sequelize, DataTypes) => {
  const LeadInterest = sequelize.define(
    'lead_interest',
    {
      lead_details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'lead_details',
          key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete if the related lead_detail is deleted
      },
      property_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'property',
          key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete if the related property is deleted
      },
      interest_level: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          min: 1,
          max: 10, // Ensuring interest level is between 1 and 10
        },
      },
    },
    {
      tableName: 'lead_interest',
      underscored: true,
      timestamps: false, // No timestamps in this table
    }
  );

  return LeadInterest;
};

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    'reservation',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reservation_fee: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0, // Default to 0 if no value is provided
        allowNull: false,
      },
      reservation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false, // Ensure reservation date is always provided
      },
      expected_closing: {
        type: DataTypes.DATEONLY,
        allowNull: false, // Ensure expected closing date is always provided
      },
      lead_details_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Foreign key to lead_details, can't be null
        references: {
          model: 'lead_details',
          key: 'id',
        },
        onDelete: 'CASCADE', // Delete reservation if related lead_details is deleted
      },
      property_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Foreign key to property, can't be null
        references: {
          model: 'property',
          key: 'id',
        },
        onDelete: 'CASCADE', // Delete reservation if related property is deleted
      },
      is_cancelled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default to not cancelled
      },
    },
    {
      tableName: 'reservation',
      underscored: true,
      timestamps: true, // Automatically manage created_at and updated_at
    }
  );

  return Reservation;
};

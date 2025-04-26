module.exports = (sequelize, DataTypes) => {
  const SaleStatus = sequelize.define(
    'sale_status',
    {
      reservation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Makes reservation_id the primary key
        allowNull: false,
        references: {
          model: 'reservation',
          key: 'id',
        },
        onDelete: 'CASCADE', // Ensures sale status is deleted if reservation is deleted
      },
      sale_date: {
        type: DataTypes.DATE,
        allowNull: false, // Required field
      },
      final_price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false, // Required field
        validate: {
          min: { args: [0], msg: 'Final price must be a positive number' },
        },
      },
      commission_details: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional field
      },
    },
    {
      tableName: 'sale_status',
      underscored: true,
      timestamps: true, // Automatically managed created_at and updated_at
    }
  );

  return SaleStatus;
};

module.exports = (sequelize, DataTypes) => {
  const LegalStatus = sequelize.define(
    'legal_status',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      contract_signed: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Allow null values for contract_signed as it may not always be provided
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true, // Allow null values for notes
      },
      reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Foreign key to reservation, can't be null
        references: {
          model: 'reservation',
          key: 'id',
        },
        onDelete: 'CASCADE', // Delete legal status if related reservation is deleted
      },
      legal_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Foreign key to the user, can't be null
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'RESTRICT', // Prevent deletion of user if linked to legal status
      },
    },
    {
      tableName: 'legal_status',
      underscored: true,
      timestamps: true, // created_at and updated_at are automatically managed
    }
  );

  return LegalStatus;
};

module.exports = (sequelize, DataTypes) => {
  const FinancialStatus = sequelize.define(
    'financial_status',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM('approved', 'rejected'),
        allowNull: false,
      },
      loan_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false, // Loan amount is required
      },
      payment_plan: {
        type: DataTypes.STRING(255),
        allowNull: false, // Payment plan is required
      },
      reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Foreign key to reservation, can't be null
        references: {
          model: 'reservation',
          key: 'id',
        },
        onDelete: 'CASCADE', // Delete financial status if related reservation is deleted
      },
      finance_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Foreign key to the finance user, can't be null
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'RESTRICT', // Prevent deletion of user if linked to financial status
      },
    },
    {
      tableName: 'financial_status',
      underscored: true,
      timestamps: true, // created_at and updated_at are automatically managed
    }
  );

  return FinancialStatus;
};

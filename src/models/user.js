module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Ensuring name is required
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false, // Ensuring email is required and unique
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true, // Optional field
      },
      role: {
        type: DataTypes.ENUM('admin', 'sales_agent', 'finance', 'legal'),
        allowNull: false, // Ensuring role is required
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'user',
      underscored: true,
      timestamps: false, // created_at is explicitly defined, so no need for auto-generated timestamps
    }
  );

  return User;
};

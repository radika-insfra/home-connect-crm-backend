module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    'property',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false, // Name is required
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false, // Location is required
      },
    },
    {
      tableName: 'property',
      underscored: true,
      timestamps: true, // created_at and updated_at
    }
  );

  return Property;
};

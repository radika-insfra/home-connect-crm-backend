module.exports = (sequelize, DataTypes) => {
  const FollowUpStatus = sequelize.define(
    'follow_up_status',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      follow_up_type: {
        type: DataTypes.ENUM('email', 'call'),
        allowNull: false,
      },
      status_notes: { type: DataTypes.TEXT, allowNull: true },
      follow_up_date: { type: DataTypes.DATE, allowNull: false },
      lead_details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'lead_details',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'follow_up_status',
      underscored: true,
      timestamps: true,
    }
  );

  return FollowUpStatus;
};

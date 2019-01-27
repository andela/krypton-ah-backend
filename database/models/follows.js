module.exports = (sequelize, DataTypes) => {
  const Follows = sequelize.define(
    'follows',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      followerId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      followeeId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    }, {}
  );
  Follows.associate = (models) => {
    Follows.belongsTo(models.User, {
      foreignKey: 'followeeId',
      as: 'following',
      onDelete: 'CASCADE'
    });
    Follows.belongsTo(models.User, {
      foreignKey: 'followerId',
      as: 'followers',
      onDelete: 'CASCADE'
    });
  };
  return Follows;
};

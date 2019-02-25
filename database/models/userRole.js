module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define('UserRoles', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  return UserRoles;
};

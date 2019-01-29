module.exports = (sequelize, DataTypes) => {
  const AdminRoles = sequelize.define('AdminRoles', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  });
  AdminRoles.associate = (models) => {
    AdminRoles.hasMany(models.User, {
      foreignKey: 'UserId'
    });
  };
  return AdminRoles;
};

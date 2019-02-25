module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  Roles.associate = (models) => {
    Roles.belongsToMany(models.User, {
      through: 'UserRoles',
      foreignKey: 'roleId'
    });
  };
  return Roles;
};

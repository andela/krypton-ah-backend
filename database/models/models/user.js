
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      type: sequelize.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        isEmail: true,
        min: 8,
      },
      unique: {
        msg: 'This email address is taken'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    isconfirmed: DataTypes.BOOLEAN
  }, {});
  User.associate = (models) => {
    User.hasOne(models.userprofile);
  };
  return User;
};


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        msg: 'This email address is taken'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    firstname: {
      type: DataTypes.STRING,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
      },
    },
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: {
          args: [true, false],
        }
      }
    },
  }, {});
  User.associate = (models) => {
    User.hasOne(models.userprofile);
  };
  return User;
};

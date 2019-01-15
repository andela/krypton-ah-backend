
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        isEmail: true,
      },
      unique: {
        msg: 'This email address is taken'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 8,
        notNull: true,
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
        isBOOLEAN: {
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


module.exports = (sequelize, DataTypes) => {
  const userprofile = sequelize.define('userprofile', {
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
    avatar: DataTypes.STRING,
    bio: {
      type: DataTypes.STRING,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
      unique: {
        msg: 'That username is already taken'
      }
    },
    country: {
      type: DataTypes.STRING,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    phonenumber: {
      type: DataTypes.INTEGER,
      validate: {
        not: ['[a-z]', 'i'],
      },
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    emailnotification: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBOOLEAN: {
          args: [true, false],
          msg: 'email notification can only be "true" or "false"'
        }
      },
      unique: {
        msg: 'This email address is taken'
      }
    },
  }, {});
  userprofile.associate = () => {
  };
  return userprofile;
};

module.exports = (sequelize, DataTypes) => {
  const userprofile = sequelize.define(
    'userprofile',
    {
      avatar: DataTypes.STRING,
      bio: {
        type: DataTypes.STRING
      },
      UserId: {
        type: DataTypes.UUID
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          is: ['^[A-Za-z]+[0-9]+', 'i']
        },
        unique: {
          msg: 'That username is already taken'
        }
      },
      country: {
        type: DataTypes.STRING,
        validate: {
          is: ['^[a-z]+$', 'i']
        }
      },
      phonenumber: {
        type: DataTypes.INTEGER,
        validate: {
          is: ['^[+]*[0-9]{0,}', 'i']
        }
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          is: ['^[a-z]+$', 'i']
        }
      },
      emailnotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isBoolean: {
            args: [true, false],
            msg: 'email notification can only be "true" or "false"'
          }
        }
      }
    },
    {}
  );
  userprofile.associate = () => {};
  return userprofile;
};

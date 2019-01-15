/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userprofiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    avatar: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    phonenumber: {
      type: Sequelize.INTEGER
    },
    gender: {
      type: Sequelize.STRING
    },
    emailnotification: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userprofiles')
};

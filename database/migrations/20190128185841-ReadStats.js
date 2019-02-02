/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReadStats', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    articleId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Articles',
        key: 'id',
        as: 'articleId'
      }
    },
    readerId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id',
        as: 'readerId'
      }
    },
    readStat: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('ReadStats')
};
